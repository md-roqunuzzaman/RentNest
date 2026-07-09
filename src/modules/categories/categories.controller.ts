import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utilities/catchAsync";
import { categoryService } from "./categories.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const createCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await categoryService.createCategory(
      userId as string,
      payload,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "category created successfully",
      data: result,
    });
  },
);
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await categoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "category retrieve successfully",
    data: result,
  });
};

export const categoryController = {
  createCategory,
  getAllCategories,
};
