import { ICreateReview } from "./review.interface";
export declare const reviewService: {
    createReview: (userId: string, payload: ICreateReview) => Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        tenantId: string;
        rentalRequestId: string;
        rating: number;
        comment: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map