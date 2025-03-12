import { notFound } from "next/navigation"
import { SidebarInset } from "@/components/ui/sidebar"
import { UserDetails } from "@/components/user-details"
import { VacationRequests } from "@/components/vacations/vacation-requests"
import {cookies} from "next/headers";

async function getUser(id: string) {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    const response = await fetch(`http://localhost:8080/api/v1/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (!response.ok) {
        notFound()
    }
    return await response.json()
}


export default async function UserPage({ params }: { params: { id: string } }) {

    const { id } = await params
    const user = await getUser(id)
    const vacationRequests = user.vacationRequests
    console.log(user)

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Detalles del Usuario</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <UserDetails user={user} />
                <VacationRequests requests={vacationRequests} />
            </div>
        </SidebarInset>
    )
}

