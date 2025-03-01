import { SidebarInset } from "@/components/ui/sidebar"
import { VacationRequestDetails } from "@/components/vacation-request-details"
import {cookies} from "next/headers";

async function getVacationRequest(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const response = await fetch(`http://localhost:8080/api/v1/vacation/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return await response.json()

}

export default async function VacationRequestPage({ params }: { params: { id: string } }) {
    const request = await getVacationRequest(params.id)

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Detalles de Solicitud de Vacaciones</h1>
            <VacationRequestDetails request={request} />
        </SidebarInset>
    )
}

