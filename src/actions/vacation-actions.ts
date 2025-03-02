"use server"

import { revalidatePath } from "next/cache"
import {cookies} from "next/headers";
import {z} from "zod";

export async function approveVacationRequest(vacationId: number) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("access_token")?.value
        const response = await fetch(`http://localhost:8080/api/v1/vacation/approve/${vacationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to approve vacation request")
        }

        const data = await response.json()
        revalidatePath(`/dashboard/vacations/${vacationId}`)
        return { success: true, data }
    } catch (error) {
        console.error("Error approving vacation request:", error)
        return { success: false, error: "Failed to approve vacation request" }
    }
}

export async function rejectVacationRequest(vacationId: number) {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    try {
        const response = await fetch(`http://localhost:8080/api/v1/vacation/reject/${vacationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to reject vacation request")
        }

        const data = await response.json()
        revalidatePath(`/dashboard/vacations/${vacationId}`)
        return { success: true, data }
    } catch (error) {
        console.error("Error rejecting vacation request:", error)
        return { success: false, error: "Failed to reject vacation request" }
    }
}

const CreateVacationRequestSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido"),
    comment: z.string().optional(),
})

export async function createVacationRequest(prevState: any, formData: FormData) {
    const validatedFields = CreateVacationRequestSchema.safeParse({
        title: formData.get("title"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        comment: formData.get("comment"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Hay errores en el formulario. Por favor, corríjalos.",
        }
    }

    const { title, startDate, endDate, comment } = validatedFields.data

    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("access_token")?.value

        const response = await fetch(`http://localhost:8080/api/v1/vacation/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, startDate, endDate, comment }),
        })

        if (!response.ok) {
            throw new Error("Failed to create vacation request")
        }

        const data = await response.json()
        revalidatePath("/dashboard/vacations")
        return { success: true, data }
    } catch (error) {
        console.error("Error creating vacation request:", error)
        return {
            success: false,
            message: "Failed to create vacation request. Try again",
        }
    }
}

