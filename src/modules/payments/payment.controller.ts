import { Request, Response } from "express";
import httpStatus from "http-status";
import { sendResponse } from "../../utilities/sendResponse";
import { paymentService } from "./payment.service";
import { CatchAsync } from "../../utilities/catchAsync";
const createPayment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const payload = req.body;
  const result = await paymentService.createPayment(userId as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment session created successfully",
    data: result,
  });
};

const confirmPayment = CatchAsync(async (req: Request, res: Response) => {
  const event = req.body as Buffer;
  const signature = req.headers["stripe-signature"]!;

  await paymentService.confirmPayment(event, signature as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Webhook triggered successfully",
    data: null,
  });
});

const getMyPayments = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await paymentService.getMyPayments(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPaymentById = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const paymentId = req.params.id;

  const result = await paymentService.getPaymentById(
    userId as string,
    paymentId as string,
  );

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
