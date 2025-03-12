import {NextRequest, NextResponse} from "next/server";
import {getUserToken} from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const user = await getUserToken()

    const publicPaths = ["/login", "/dashboard"]
    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next()
    }

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const adminOnlyPaths = ["/dashboard/users/new", "/dashboard/users/*/edit", "/dashboard/users/positions",
        "/dashboard/users/positions/*/edit", "/dashboard/users/positions/new"]
    const managerPaths = ["/dashboard/users", "/dashboard/users/*"]
    const userPaths = ["/dashboard/me"]

    if(user.role === "ADMIN") {
        return NextResponse.next()
    } else if (user.role === "MANAGER") {
        if (adminOnlyPaths.some((path) => {
            const pattern = new RegExp(`^${path.replace("*", ".*")}$`)
            return pattern.test(request.nextUrl.pathname)
        })
        ) {
            return NextResponse.redirect(new URL("/dashboard/users", request.url))
        }
    } else if (user.role === "USER") {
        if (![...userPaths, "/dashboard"].some((path) => request.nextUrl.pathname.startsWith(path))) {
            return NextResponse.redirect(new URL("/dashboard/me", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}