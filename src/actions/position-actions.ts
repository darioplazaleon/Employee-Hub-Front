'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import {cookies} from "next/headers";

const PositionSchema = z.object({
    name: z.string().min(2, "The name must be at least 2 characters long")
})

export async function createPosition(prevState: any, formData: FormData) {
    const validatedFields = PositionSchema.safeParse({
        name: formData.get("name")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "There are errors in the form. Please correct them.",
        }
    }

    const { name } = validatedFields.data

    console.log("Creating position:", { name })

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    try {
        const response = await fetch('http://localhost:8080/api/v1/positions/create', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name }),
        })

        if (!response.ok) {
            throw new Error('Error creating position')
        }

        const data = await response.json()
        console.log("Position created:", data)

        await new Promise((resolve) => setTimeout(resolve, 1000))

    } catch (error) {
        console.error("Error creating position:", error)
        return {
            success: false,
            message: "Error creating position",
        }
    }

    revalidatePath("/dashboard/users/positions")
    redirect("/dashboard/users/positions")
}

export async function updatePosition(id: number, prevState: any, formData: FormData) {
    const validatedFields = PositionSchema.safeParse({
        name: formData.get("name")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "There are errors in the form. Please correct them.",
        }
    }

    const { name } = validatedFields.data

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    try {
        const response = await fetch(`http://localhost:8080/api/v1/positions/update/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name }),
        })

        if (!response.ok) {
            throw new Error('Error updating position')
        }

        const data = await response.json()
        console.log("Position updated:", data)

        await new Promise((resolve) => setTimeout(resolve, 1000))

    } catch (error) {
        console.error("Error updating position:", error)
        return {
            success: false,
            message: "Error updating position",
        }
    }

    revalidatePath("/dashboard/users/positions")
    redirect("/dashboard/users/positions")
}

export async function deletePosition(id: number) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("access_token")?.value

        console.log("Deleting position with id:", id)

        const response = await fetch(`http://localhost:8080/api/v1/positions/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error deleting position')
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))

        revalidatePath("/positions")
        return { success: true, message: "Position deleted successfully" }
    } catch (error) {
        console.error("Error deleting position:", error)
        return { success: false, message: "Error deleting position" }
    }
}