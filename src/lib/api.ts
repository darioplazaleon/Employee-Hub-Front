'use server'

import type {UserToken} from "./auth"
import {cookies} from "next/headers";

export interface User {
    id: number
    name: string
    email: string
    position: string
    role: "ADMIN" | "MANAGER" | "USER"
    salary: number
    createdAt: string
    vacationRequests: VacationRequest[]
}

export interface VacationRequest {
    id: number
    title: string
    createdAt: string
    startDate: string
    endDate: string
    comment: string
    status: string
    employeeName: string
    approvedBy: string | null
}

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

export async function getUserData(userToken: UserToken): Promise<User> {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    const response = await fetch(`${process.env.API_BASE_URL}/user/${userToken.jti}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok) {
        throw new Error("Failed to fetch user data")
    }

    return await response.json()
}

