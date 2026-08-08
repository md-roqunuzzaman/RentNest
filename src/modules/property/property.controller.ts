import { Request, Response } from "express";

import { propertyService } from "./property.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "../categories/categories.service";
import { CatchAsync } from "../../utilities/catchAsync";

const getAllProperties = async (req: Request, res: Response) => {
  const result = await propertyService.getAllProperties(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
};

const getPropertyById = async (req: Request, res: Response) => {
  const propertyId = req.params.id;
  console.log(propertyId, "propertyId");
  const result = await propertyService.getPropertyById(propertyId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrieved successfully",
    data: result,
  });
};
const getAllCategories = async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
};

const getRelatedProperties = CatchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await propertyService.getRelatedProperties(id);

  res.status(200).json({
    success: true,
    message: "Related properties retrieved successfully",
    data: result,
  });
});
export const propertyController = {
  getAllProperties,
  getPropertyById,
  getAllCategories,
  getRelatedProperties,
};
