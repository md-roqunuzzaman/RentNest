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
export const categoryController = {
    createCategory,
    getAllCategories,
};
//# sourceMappingURL=categories.controller.js.map