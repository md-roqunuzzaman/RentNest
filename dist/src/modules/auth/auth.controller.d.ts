import { NextFunction, Request, Response } from "express";
export declare const authController: {
    registerUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map