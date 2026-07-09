import httpStatus from "http-status";
import { sendResponse } from "../../utilities/sendResponse";
import { paymentService } from "./payment.service";
import { CatchAsync } from "../../utilities/catchAsync";
const createPayment = async (req, res) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await paymentService.createPayment(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment session created successfully",
        data: result,
    });
};
const confirmPayment = CatchAsync(async (req, res) => {
    const event = req.body;
    const signature = req.headers["stripe-signature"];
    await paymentService.confirmPayment(event, signature);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Webhook triggered successfully",
        data: null,
    });
});
const getMyPayments = CatchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await paymentService.getMyPayments(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments retrieved successfully",
        data: result,
    });
});
const getPaymentById = CatchAsync(async (req, res) => {
    const userId = req.user?.id;
    const paymentId = req.params.id;
    const result = await paymentService.getPaymentById(userId, paymentId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment retrieved successfully",
        data: result,
    });
});
export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.controller.js.map