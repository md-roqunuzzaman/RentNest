import { PropertyWhereInput } from "../../../generated/prisma/models";
interface IPropertyQuery extends PropertyWhereInput {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
}
export declare const propertyService: {
    getAllProperties: (query: IPropertyQuery) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            landlord: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            rent: number;
            city: string;
            address: string;
            bedrooms: number;
            bathrooms: number;
            availability: boolean;
            image: string | null;
            categoryId: string;
            landlordId: string;
        })[];
    }>;
    getPropertyById: (propertyId: string) => Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        landlord: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        rent: number;
        city: string;
        address: string;
        bedrooms: number;
        bathrooms: number;
        availability: boolean;
        image: string | null;
        categoryId: string;
        landlordId: string;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
};
export {};
//# sourceMappingURL=property.service.d.ts.map