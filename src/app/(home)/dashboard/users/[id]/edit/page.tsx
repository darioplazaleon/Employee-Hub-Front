import { notFound } from "next/navigation"
import { SidebarInset } from "@/components/ui/sidebar"
import { UserForm } from "@/components/user-form"
import {cookies} from "next/headers";

async function getUser(id: string) {

    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value

    const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    if (!response.ok) {
        return notFound()
    }
    return response.json()
}

type Params = Promise<{ id: string }>

export default async function EditUserPage({ params }: { params: Params }) {

    const parameters = await params
    const id = parameters.id

    const user = await getUser(id)

    console.log(user)

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
            <UserForm user={user} />
        </SidebarInset>
    )
}

