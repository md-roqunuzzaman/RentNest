import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utilities/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const getAllUsers = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
    });
  },
);

const updateUserStatus = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await adminService.updateUserStatus(id as string, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
    });
  },
);

const getAllProperties = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
};
