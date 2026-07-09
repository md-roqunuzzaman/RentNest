import { RentalStatus, UserStatus } from "../../../generated/prisma/enums";
import { IUpdateUserStatus } from "./admin.interface";
export declare const adminService: {
    getAllUsers: () => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUserStatus: (userId: string, payload: IUpdateUserStatus) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: UserStatus;
        updatedAt: Date;
    }>;
    getAllProperties: () => Promise<({
        rentalRequest: {
            id: string;
            status: RentalStatus;
        }[];
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
    })[]>;
    getStats: () => Promise<{
        totalUsers: number;
        totalProperties: number;
        availableProperties: number;
        totalRentalRequests: number;
        activeRentals: number;
        totalRevenue: number;
    }>;
    getAllRentals: () => Promise<({
        property: {
            id: string;
            title: string;
            rent: number;
            city: string;
            address: string;
            landlord: {
                id: string;
                email: string;
                name: string;
            };
        };
        tenant: {
            id: string;
            email: string;
            name: string;
            role: import("../../../generated/prisma/enums").Role;
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
};
//# sourceMappingURL=admin.service.d.ts.map