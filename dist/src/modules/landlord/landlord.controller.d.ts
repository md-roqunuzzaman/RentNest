import { NextFunction, Request, Response } from "express";
export declare const landlordController: {
    createProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProperty: (req: Request, res: Response) => Promise<void>;
    deleteProperty: (req: Request, res: Response) => Promise<void>;
    getRentalRequests: (req: Request, res: Response) => Promise<void>;
    updateRentalRequestStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=landlord.controller.d.ts.map