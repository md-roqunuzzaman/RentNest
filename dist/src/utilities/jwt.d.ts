import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export declare const jwtUtils: {
    createToken: (payload: JwtPayload, secret: string, expiresIn: SignOptions) => string;
    verifyToken: (token: string, secret: string) => {
        success: boolean;
        data: string | jwt.JwtPayload;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    };
};
//# sourceMappingURL=jwt.d.ts.map