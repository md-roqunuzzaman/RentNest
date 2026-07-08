import { CatchAsync } from "../../utilities/catchAsync";
import { landlordService } from "./landlord.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const createProperty = CatchAsync(async (req, res, next) => {
    const landlordId = req.user?.id;
    const payload = req.body;
    const result = await landlordService.createProperty(landlordId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "property created successfully",
        data: result,
    });
});
const updateProperty = async (req, res) => {
    const userId = req.user?.id;
    const propertyId = req.params.id;
    const result = await landlordService.updateProperty(userId, propertyId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property updated successfully",
        data: result,
    });
};
const deleteProperty = async (req, res) => {
    const userId = req.user?.id;
    const propertyId = req.params.id;
    await landlordService.deleteProperty(userId, propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property deleted successfully",
        data: null,
    });
};
const getRentalRequests = async (req, res) => {
    const userId = req.user?.id;
    const result = await landlordService.getRentalRequests(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result,
    });
};
const updateRentalRequestStatus = async (req, res) => {
    const userId = req.user?.id;
    const requestId = req.params.id;
    const result = await landlordService.updateRentalRequestStatus(userId, requestId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request updated successfully",
        data: result,
    });
};
export const landlordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getRentalRequests,
    updateRentalRequestStatus,
};
//# sourceMappingURL=landlord.controller.js.map