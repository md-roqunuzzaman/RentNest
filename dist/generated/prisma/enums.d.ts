export declare const Role: {
    readonly TENANT: "TENANT";
    readonly LANDLORD: "LANDLORD";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const PropertyType: {
    readonly APARTMENT: "APARTMENT";
    readonly HOUSE: "HOUSE";
    readonly STUDIO: "STUDIO";
    readonly DUPLEX: "DUPLEX";
    readonly VILLA: "VILLA";
    readonly PENTHOUSE: "PENTHOUSE";
    readonly OFFICE: "OFFICE";
    readonly SHOP: "SHOP";
};
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
export declare const RentalStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
};
export type RentalStatus = (typeof RentalStatus)[keyof typeof RentalStatus];
export declare const PaymentProvider: {
    readonly STRIPE: "STRIPE";
};
export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];
export declare const PaymentMethod: {
    readonly CARD: "CARD";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map