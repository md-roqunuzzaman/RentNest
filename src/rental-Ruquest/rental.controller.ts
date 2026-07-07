import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utilities/catchAsync";
import { rentalService } from "./rental.service";
import { sendResponse } from "../utilities/sendResponse";
import httpStatus from "http-status";
const createRentalRequest = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await rentalService.createRentalRequest(
      userId as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental request submitted successfully",
      data: result,
    });
  },
);

const getMyRentalRequests = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await rentalService.getMyRentalRequests(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result,
  });
};
const getRentalRequestById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const rentalRequestId = req.params.id;

  const result = await rentalService.getRentalRequestById(
    userId as string,
    rentalRequestId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request retrieved successfully",
    data: result,
  });
};
export const rentalController = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
};
