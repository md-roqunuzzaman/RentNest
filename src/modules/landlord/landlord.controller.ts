import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utilities/catchAsync";
import { landlordService } from "./landlord.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const createProperty = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("REQUEST BODY:", req.body);
    const landlordId = req.user?.id;
    const payload = req.body;
    const result = await landlordService.createProperty(
      landlordId as string,
      payload,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "property created successfully",
      data: result,
    });
  },
);

const updateProperty = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const propertyId = req.params.id;

  const result = await landlordService.updateProperty(
    userId as string,
    propertyId as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property updated successfully",
    data: result,
  });
};

const deleteProperty = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const propertyId = req.params.id;

  await landlordService.deleteProperty(userId as string, propertyId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property deleted successfully",
    data: null,
  });
};

const getRentalRequests = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await landlordService.getRentalRequests(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result,
  });
};

const updateRentalRequestStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const requestId = req.params.id;

  const result = await landlordService.updateRentalRequestStatus(
    userId as string,
    requestId as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request updated successfully",
    data: result,
  });
};
const getMyProperties = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landlordId = req.user!.id;

    const result = await landlordService.getMyProperties(landlordId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My properties retrieved successfully",
      data: result,
    });
  },
);
export const landlordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRentalRequests,
  updateRentalRequestStatus,
  getMyProperties,
};
