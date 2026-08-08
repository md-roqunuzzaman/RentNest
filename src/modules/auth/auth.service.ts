import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utilities/jwt";
import { ILogin, IRegister } from "./auth.interface";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
const registerUser = async (payload: IRegister) => {
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

const loginUser = async (payload: ILogin) => {
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

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );

  if (!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error);
  }

  const { id } = verifiedRefreshToken.data as JwtPayload;

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

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return { accessToken };
};

const getMe = async (userId: string) => {
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

const googleClient = new OAuth2Client(config.google_client_id);

const googleLoginService = async (token: string) => {
  // Verify Google Token

  const ticket = await googleClient.verifyIdToken({
    idToken: token,

    audience: config.google_client_id,
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw new Error("Invalid Google token");
  }

  const { email, name, picture } = payload;

  // Find existing user

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Create new user if not exists

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name || "Google User",

        email,

        // if password required in schema
        password: await bcrypt.hash(crypto.randomUUID(), 10),

        role: "TENANT",
      },
    });
  }

  // Block check

  if (user.status === "BLOCKED") {
    throw new Error("Your account has been blocked. Please contact support.");
  }

  // JWT Payload

  const jwtPayload = {
    id: user.id,

    name: user.name,

    email: user.email,

    role: user.role,
  };

  // Create Access Token

  const accessToken = jwtUtils.createToken(
    jwtPayload,

    config.jwt_access_secret,

    config.jwt_access_expires_in as SignOptions,
  );

  // Create Refresh Token

  const refreshToken = jwtUtils.createToken(
    jwtPayload,

    config.jwt_refresh_secret,

    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    user: {
      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,
    },

    accessToken,

    refreshToken,
  };
};

export const authService = {
  registerUser,
  loginUser,
  refreshToken,
  getMe,
  googleLoginService,
};
