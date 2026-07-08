import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utilities/catchAsync";

const getAllUsers = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const adminController = {
  getAllUsers,
};
