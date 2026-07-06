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

const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const payload = req.body;

  const isAdmin = req.user?.role == "ADMIN";
  if (!isAdmin) {
    throw new Error("You are not authorized");
  }
  const result = await categoryService.updateCategory(
    categoryId as string,

    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "category updated successfully",
    data: result,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const isAdmin = req.user?.role == "ADMIN";
  if (!isAdmin) {
    throw new Error("You are not authorized");
  }
  const result = await categoryService.deleteCategory(categoryId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "category deleted successfully",
    data: {},
  });
};
export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
