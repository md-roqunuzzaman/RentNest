import { ILogin, IRegister } from "./auth.interface";
export declare const authService: {
    registerUser: (payload: IRegister) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    loginUser: (payload: ILogin) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    getMe: (userId: string) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map