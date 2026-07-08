import { RentalStatus } from "../../../generated/prisma/enums";
import { ICreateProperty, IUpdateRentalRequestStatus } from "./landlord.interface";
export declare const landlordService: {
    createProperty: (landlordId: string, payload: ICreateProperty) => Promise<{
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
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
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
    updateProperty: (userId: string, propertyId: string, payload: any) => Promise<{
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
    deleteProperty: (userId: string, propertyId: string) => Promise<null>;
    getRentalRequests: (userId: string) => Promise<({
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
        };
        tenant: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        status: RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        months: number;
        message: string | null;
    })[]>;
    updateRentalRequestStatus: (userId: string, requestId: string, payload: IUpdateRentalRequestStatus) => Promise<{
        property: {
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
        };
        tenant: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        status: RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        months: number;
        message: string | null;
    }>;
};
//# sourceMappingURL=landlord.service.d.ts.map