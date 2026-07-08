import { NextFunction, Request, Response } from "express";
export declare const categoryController: {
    createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCategory: (req: Request, res: Response) => Promise<void>;
    deleteCategory: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=categories.controller.d.ts.map