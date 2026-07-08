import { propertyService } from "./property.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "../categories/categories.service";
const getAllProperties = async (req, res) => {
    const result = await propertyService.getAllProperties(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
};
const getPropertyById = async (req, res) => {
    const propertyId = req.params.id;
    console.log(propertyId, "propertyId");
    const result = await propertyService.getPropertyById(propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrieved successfully",
        data: result,
    });
};
const getAllCategories = async (req, res) => {
    const result = await categoryService.getAllCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: result,
    });
};
export const propertyController = {
    getAllProperties,
    getPropertyById,
    getAllCategories,
};
//# sourceMappingURL=property.controller.js.map