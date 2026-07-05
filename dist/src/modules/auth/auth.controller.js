import { CatchAsync } from "../../utilities/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
const registerUser = CatchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = await authService.registerUser(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "user register successfully",
        data: { user },
    });
});
const loginUser = CatchAsync(async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: { accessToken, refreshToken },
    });
});
const refreshToken = CatchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refreshed Successfully",
        data: {
            accessToken,
        },
    });
});
const getMe = CatchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("User information not found in request.");
    }
    const user = await authService.getMe(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "my data retrieve successfully",
        data: user,
    });
});
export const authController = {
    registerUser,
    loginUser,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map