'use server'

import {cookies} from "next/headers";

export async function getPositions() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    const response = await fetch("http://localhost:8080/api/v1/positions/get-all", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response.json()
}

