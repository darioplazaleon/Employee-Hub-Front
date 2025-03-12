import {getUserToken} from "@/lib/auth";
import {NextResponse} from "next/server";
import {getUserData} from "@/lib/api";

export async function GET() {
    const userToken = await getUserToken();

    if(!userToken) {
        return NextResponse.json({ error: "Not Authenticated"}, {status: 401})
    }

    try {
        const userData = await getUserData(userToken);
        return NextResponse.json(userData);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch user data"}, {status: 500})
    }
}