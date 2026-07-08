import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utilities/jwt";
import bcrypt from "bcrypt";
const registerUser = async (payload) => {
    const { name, email, password, role } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (isUserExist) {
        throw new Error("user already exist");
    }
    const allowedRoles = role;
    if (!allowedRoles.includes(payload.role)) {
        throw new Error("Invalid role selection");
    }
    const hashPass = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashPass,
            role: role,
        },
    });
    const user = await prisma.user.findUnique({
        where: {
            id: createUser.id,
            email: createUser.email,
        },
        omit: {
            password: true,
        },
    });
    return user;
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email },
    });
    if (user.status === "BLOCKED") {
        throw new Error("Your account has been blocked. Please contact support.");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (refreshToken) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);
    if (!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error);
    }
    const { id } = verifiedRefreshToken.data;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (user.status === "BLOCKED") {
        throw new Error("Your account has been blocked. Please contact support.");
    }
    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    return { accessToken };
};
const getMe = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: {
            password: true,
        },
    });
    return user;
};
export const authService = {
    registerUser,
    loginUser,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.service.js.map