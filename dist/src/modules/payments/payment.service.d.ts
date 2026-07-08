import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import { ICreatePayment } from "./payment.interface";
export declare const paymentService: {
    createPayment: (userId: string, payload: ICreatePayment) => Promise<{
        checkoutUrl: string | null;
        payment: {
            id: string;
            status: PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            provider: import("../../../generated/prisma/enums").PaymentProvider;
            method: import("../../../generated/prisma/enums").PaymentMethod;
            transactionId: string | null;
            sessionId: string | null;
            paidAt: Date | null;
            rentalRequestId: string;
        };
    }>;
    confirmPayment: (payload: Buffer, signature: string) => Promise<{
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        method: import("../../../generated/prisma/enums").PaymentMethod;
        transactionId: string | null;
        sessionId: string | null;
        paidAt: Date | null;
        rentalRequestId: string;
    } | {
        message: string;
    } | null>;
    getMyPayments: (userId: string) => Promise<({
        rentalRequest: {
            property: {
                category: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string;
                rent: number;
                city: string;
                address: string;
                bedrooms: number;
                bathrooms: number;
                availability: boolean;
                image: string | null;
                categoryId: string;
                landlordId: string;
            };
        } & {
            id: string;
            status: RentalStatus;
            createdAt: Date;
            updatedAt: Date;
            propertyId: string;
            tenantId: string;
            moveInDate: Date;
            months: number;
            message: string | null;
        };
    } & {
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        method: import("../../../generated/prisma/enums").PaymentMethod;
        transactionId: string | null;
        sessionId: string | null;
        paidAt: Date | null;
        rentalRequestId: string;
    })[]>;
};
//# sourceMappingURL=payment.service.d.ts.map