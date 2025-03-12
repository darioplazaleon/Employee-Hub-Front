import {cookies} from "next/headers";
import {jwtVerify} from "jose";

export type UserRole = "ADMIN" | "MANAGER" | "USER";

export interface UserToken {
    jti: string;
    name: string;
    role: UserRole;
    sub: string;
    iat: number;
    exp: number;
}

export async function getUserToken(): Promise<UserToken | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    try {
        const jwt_secret = process.env.JWT_SECRET;
        const secret = Buffer.from(jwt_secret, "base64");

        const verified = await jwtVerify(token, secret);
        const payload = verified.payload

        return {
            jti: Number(payload.jti),
            role: payload.role as UserRole,
        }

    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

export function canAccessRoute(user: UserToken | null, allowedRoles: UserRole[]): boolean {
    return user !== null && allowedRoles.includes(user.role);
}