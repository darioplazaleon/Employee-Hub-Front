'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";
import {revalidatePath} from "next/cache";

const employeeSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("El email no es válido"),
    positionId: z.number().int().positive("Debe seleccionar una posición"),
    salary: z.number().positive("El salario debe ser un número positivo"),
    role: z.enum(["ADMIN", "MANAGER", "USER"], {
        errorMap: () => ({ message: "Debe seleccionar un rol válido" }),
    }),
});

export async function createUser(prevState: any, formData: FormData) {
    const validatedFields = employeeSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        positionId: Number.parseInt(formData.get("positionId") as string),
        salary: Number.parseInt(formData.get("salary") as string),
        role: formData.get("role"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Hay errores en el formulario. Por favor, corríjalos.",
        }
    }

    const { name, email, positionId, salary, role } = validatedFields.data

    console.log(validatedFields.data)

    console.log("Creando usuario:", { name, email, positionId, salary, role })

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    const response = await fetch("http://localhost:8080/api/v1/user/create", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    });

    if (response.ok) {
        console.log("User created successfully");
        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
    } else {
        console.error("Failed to create user");
    }
}

export async function updateUser(id: number, prevState: any, formData: FormData) {
    const validatedFields = employeeSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        positionId: Number.parseInt(formData.get("positionId") as string),
        salary: Number.parseInt(formData.get("salary") as string),
        role: formData.get("role"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Hay errores en el formulario. Por favor, corríjalos.",
        }
    }

    const { name, email, positionId, salary, role } = validatedFields.data

    console.log(validatedFields.data)

    console.log("Updating User:", { name, email, positionId, salary, role })

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    });

    if (response.ok) {
        console.log("User updated successfully");
        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
    } else {
        console.error("Failed to update user");
    }
}

export async function deleteUser(id: number) {
    try {
        console.log("Eliminando usuario con ID:", id);

        const cookieStore = await cookies();
        const access_token = cookieStore.get("access_token")?.value;

        const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        // Simular una demora en la operación
        await new Promise((resolve) => setTimeout(resolve, 1000));

        revalidatePath("/users/list");
        return { success: true, message: "Usuario eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return { success: false, message: "Error al eliminar el usuario" };
    }
}