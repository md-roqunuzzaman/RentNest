import { ICreateCategory } from "./categories.interface";
export declare const categoryService: {
    createCategory: (userId: string, payload: ICreateCategory) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateCategory: (categoryId: string, payload: {
        name: string;
    }) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory: (categoryId: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=categories.service.d.ts.map