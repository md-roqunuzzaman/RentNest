import { CatchAsync } from "../../utilities/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const getAllUsers = CatchAsync(async (req, res, next) => {
    const result = await adminService.getAllUsers();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: result,
    });
});
const updateUserStatus = CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await adminService.updateUserStatus(id, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: result,
    });
});
const getAllProperties = CatchAsync(async (req, res, next) => {
    const result = await adminService.getAllProperties();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result,
    });
});
const getStats = CatchAsync(async (req, res) => {
    const result = await adminService.getStats();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Admin stats retrieved successfully",
        data: result,
    });
});
const getAllRentals = CatchAsync(async (req, res) => {
    const result = await adminService.getAllRentals();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result,
    });
});
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getStats,
    getAllRentals,
};
//# sourceMappingURL=admin.controller.js.map