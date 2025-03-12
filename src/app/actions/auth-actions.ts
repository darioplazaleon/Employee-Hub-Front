"use server"

import {cookies} from "next/headers"
import {redirect} from "next/navigation"
import {z} from "zod"
import {revalidatePath} from "next/cache"

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export async function logoutAction() {
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");

    redirect("/")
}

export async function changePasswordAction(userId: number, formData: FormData) {
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const validationResult = changePasswordSchema.safeParse({
        currentPassword,
        newPassword,
        confirmPassword,
    })

    if (!validationResult.success) {
        return {
            success: false,
            errors: validationResult.error.flatten().fieldErrors,
        }
    }

    try {
        const cookiesStore = await cookies()

        const token = cookiesStore.get("access_token")?.value
        const response = await fetch(`${process.env.API_BASE_URL}/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                message: errorData.message || "Failed to change password",
            }
        }

        revalidatePath("/dashboard/settings/change-password")

        return {
            success: true,
            message: "Password changed successfully",
        }
    } catch (error) {
        console.error("Error changing password:", error)
        return {
            success: false,
            message: "An error occurred while changing password",
        }
    }
}

