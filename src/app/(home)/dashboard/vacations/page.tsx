import {SidebarInset} from "@/components/ui/sidebar"
import {VacationRequestsListWithFilters} from "@/components/vacations/vacation-requests-list-with-filters"
import {cookies} from "next/headers";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusCircle} from "lucide-react";
import {getUserToken} from "@/lib/auth";
import {getUserData} from "@/lib/api";

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
    const userToken = await getUserToken()
    const userRole = userToken?.role

    const userData = await getUserData(userToken)
    const userVacationRequests = userData.vacationRequests
    console.log(userVacationRequests)

    let requests = []
    if (userRole === "ADMIN" || userRole === "MANAGER") {
        requests = await getVacationRequests()
    } else if (userRole === "USER") {
        requests = userVacationRequests
    }

    return (
        <SidebarInset className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Vacation Request</h1>
                <div className="ml-4">
                    <Button asChild>
                        <Link href="/dashboard/vacations/new">
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            New request
                        </Link>
                    </Button>
                </div>
            </div>
            <VacationRequestsListWithFilters initialRequests={requests}/>
        </SidebarInset>
    )
}

