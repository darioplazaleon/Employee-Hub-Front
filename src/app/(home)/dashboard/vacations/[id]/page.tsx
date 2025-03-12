import {SidebarInset} from "@/components/ui/sidebar"
import {cookies} from "next/headers";
import {getUserToken} from "@/lib/auth";
import {VacationRequestActions} from "@/components/vacations/details/vacation=request-actions";

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

export default async function VacationRequestPage({params}: { params: { id: string } }) {
    const parameters = await params
    const id = parameters.id

    const request = await getVacationRequest(id)
    const userToken = await getUserToken()
    const canManageRequests = userToken?.role === "ADMIN" || userToken?.role === "MANAGER"

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Vacation request details</h1>
            <VacationRequestActions request={request} canManageRequests={canManageRequests} />
        </SidebarInset>
    )
}