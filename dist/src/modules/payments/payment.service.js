import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
const createPayment = async (userId, payload) => {
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: {
            id: payload.rentalRequestId,
        },
        include: {
            property: true,
        },
    });
    if (!rentalRequest) {
        throw new Error("Rental request not found");
    }
    if (rentalRequest.tenantId !== userId) {
        throw new Error("You are not authorized");
    }
    if (rentalRequest.status !== RentalStatus.APPROVED) {
        throw new Error("Rental request is not approved yet wait for approval");
    }
    const existingPayment = await prisma.payment.findUnique({
        where: {
            rentalRequestId: payload.rentalRequestId,
        },
    });
    if (existingPayment) {
        throw new Error("Payment already created");
    }
    // Total amount
    const amount = rentalRequest.property.rent * rentalRequest.months;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "bdt",
                    unit_amount: Math.round(amount * 100),
                    product_data: {
                        name: rentalRequest.property.title,
                        description: rentalRequest.property.description,
                    },
                },
            },
        ],
        success_url: `${config.app_url}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.app_url}/payment-cancel`,
    });
    const payment = await prisma.payment.create({
        data: {
            rentalRequestId: rentalRequest.id,
            amount,
            provider: "STRIPE",
            method: "CARD",
            sessionId: session.id,
            status: PaymentStatus.PENDING,
        },
    });
    return {
        checkoutUrl: session.url,
        payment,
    };
};
const confirmPayment = async (payload, signature) => {
    console.log(" Webhook called");
    if (!signature) {
        throw new Error("Stripe signature is missing");
    }
    const event = stripe.webhooks.constructEvent(payload, signature, config.stripe_webhook_secret);
    console.log(event.type);
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const payment = await prisma.payment.findFirst({
            where: {
                sessionId: session.id,
            },
        });
        if (!payment) {
            throw new Error("Payment not found");
        }
        if (payment.status === PaymentStatus.COMPLETED) {
            return payment;
        }
        await prisma.$transaction(async (tx) => {
            await tx.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    status: PaymentStatus.COMPLETED,
                    transactionId: session.payment_intent,
                    paidAt: new Date(),
                },
            });
            await tx.rentalRequest.update({
                where: {
                    id: payment.rentalRequestId,
                },
                data: {
                    status: RentalStatus.ACTIVE,
                },
            });
        });
        return await prisma.payment.findUnique({
            where: {
                id: payment.id,
            },
            include: {
                rentalRequest: true,
            },
        });
    }
    return {
        message: "Unhandled event",
    };
};
const getMyPayments = async (userId) => {
    return await prisma.payment.findMany({
        where: {
            rentalRequest: {
                tenantId: userId,
            },
        },
        include: {
            rentalRequest: {
                include: {
                    property: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getPaymentById = async (userId, paymentId) => {
    const payment = await prisma.payment.findFirst({
        where: {
            id: paymentId,
            rentalRequest: {
                tenantId: userId,
            },
        },
        include: {
            rentalRequest: {
                include: {
                    property: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    return payment;
};
export const paymentService = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.service.js.map