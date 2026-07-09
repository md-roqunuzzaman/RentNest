import { Request, Response } from "express";
export declare const paymentController: {
    createPayment: (req: Request, res: Response) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyPayments: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map