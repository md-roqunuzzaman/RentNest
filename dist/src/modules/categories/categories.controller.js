import { CatchAsync } from "../../utilities/catchAsync";
import { categoryService } from "./categories.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const createCategory = CatchAsync(async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await categoryService.createCategory(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "category created successfully",
        data: result,
    });
});
const getAllCategories = async (req, res, next) => {
    const result = await categoryService.getAllCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "category retrieve successfully",
        data: result,
    });
};
const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const payload = req.body;
    const isAdmin = req.user?.role == "ADMIN";
    if (!isAdmin) {
        throw new Error("You are not authorized");
    }
    const result = await categoryService.updateCategory(categoryId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "category updated successfully",
        data: result,
    });
};
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    const isAdmin = req.user?.role == "ADMIN";
    if (!isAdmin) {
        throw new Error("You are not authorized");
    }
    const result = await categoryService.deleteCategory(categoryId);
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
//# sourceMappingURL=categories.controller.js.map