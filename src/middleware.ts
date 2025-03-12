import type { NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {getUserToken} from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const user = await getUserToken()
    const path = request.nextUrl.pathname

    const publicPaths = ["/"]
    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next()
    }

    if (!user) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    const adminPaths = [
        // Los administradores tienen acceso a todo
        "/dashboard",
        "/dashboard/users",
        "/dashboard/users/new",
        "/dashboard/users/[id]",
        "/dashboard/users/[id]/edit",
        "/dashboard/positions",
        "/dashboard/positions/new",
        "/dashboard/positions/[id]/edit",
        "/dashboard/vacation-requests",
        "/dashboard/vacation-requests/new",
        "/dashboard/vacation-requests/[id]",
        "/dashboard/settings/change-password",
    ]

    const managerPaths = [
        "/dashboard",
        "/dashboard/users",
        "/dashboard/users/[id]",
        "/dashboard/positions",
        "/dashboard/vacation-requests",
        "/dashboard/vacation-requests/new",
        "/dashboard/vacation-requests/[id]",
        "/dashboard/settings/change-password",
    ]

    const userPaths = [
        "/dashboard",
        "/dashboard/vacation-requests",
        "/dashboard/vacation-requests/new",
        "/dashboard/vacation-requests/[id]",
        "/dashboard/settings/change-password",
    ]

    let allowedPaths: string[] = []

    if (user.role === "ADMIN") {
        allowedPaths = adminPaths
    } else if (user.role === "MANAGER") {
        allowedPaths = managerPaths
    } else if (user.role === "USER") {
        allowedPaths = userPaths
    }

    let isAllowed = false
    let matchedPath = ""

    for (const allowedPath of allowedPaths) {
        // Si la ruta tiene parámetros dinámicos, convertirla a regex
        if (allowedPath.includes("[")) {
            const regexPattern = allowedPath.replace(/\[([^\]]+)\]/g, "([^/]+)")
            const regex = new RegExp(`^${regexPattern}$`)
            if (regex.test(path)) {
                isAllowed = true
                matchedPath = allowedPath
                break
            }
        }
        // Verificación exacta solamente, sin permitir subrutas automáticamente
        else if (path === allowedPath) {
            isAllowed = true
            matchedPath = allowedPath
            break
        }
        // Verificar subrutas solo para rutas específicas que lo necesiten
        else if (
            // Solo permitir subrutas para estas rutas específicas
            (allowedPath === "/dashboard/vacation-requests" && path.startsWith("/dashboard/vacation-requests/")) ||
            (allowedPath === "/dashboard/users" && path.startsWith("/dashboard/users/") && user.role !== "USER") ||
            (allowedPath === "/dashboard/positions" && path.startsWith("/dashboard/positions/") && user.role !== "USER")
        ) {
            isAllowed = true
            matchedPath = allowedPath
            break
        }
    }

    console.log("Path:", path);
    console.log("User role:", user.role);
    console.log("Allowed paths:", allowedPaths);
    console.log("Is allowed:", isAllowed);

    // Si la ruta no está permitida, redirigir a la página principal
    if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}