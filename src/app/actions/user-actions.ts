'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function updateUser(id: number ,formData: FormData) {

    const rawFormData = {
        name: formData.get("name"),
        email: formData.get("email"),
        position: formData.get("position"),
        salary: Number(formData.get("salary")),
        role: formData.get("role")
    }

    console.log("Update user", rawFormData)

    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value

    const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rawFormData)
    })

    if (response.ok) {
        console.log("User created successfully")
        redirect("/dashboard/users")
    } else {
        console.error("Failed to create user")
    }
}