import { SidebarInset } from "@/components/ui/sidebar"
import { VacationRequestsListWithFilters } from "@/components/vacation-requests-list-with-filters"
import {cookies} from "next/headers";

async function getVacationRequests() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value


    const response = await fetch(`http://localhost:8080/api/v1/vacation/all`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return await response.json()
}

export default async function VacationRequestsPage() {
    const requests = await getVacationRequests()

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Solicitudes de Vacaciones</h1>
            <VacationRequestsListWithFilters initialRequests={requests} />
        </SidebarInset>
    )
}

