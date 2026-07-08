import { ICreateRentalRequest } from "./rental.interface";
export declare const rentalService: {
    createRentalRequest: (userId: string, payload: ICreateRentalRequest) => Promise<{
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
            password: string;
            role: import("../../generated/prisma/enums").Role;
            status: import("../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        months: number;
        message: string | null;
    }>;
    getMyRentalRequests: (userId: string) => Promise<({
        property: {
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
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        months: number;
        message: string | null;
    })[]>;
    getRentalRequestById: (userId: string, rentalRequestId: string) => Promise<{
        property: {
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
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        months: number;
        message: string | null;
    }>;
};
//# sourceMappingURL=rental.service.d.ts.map