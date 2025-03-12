import {SidebarInset} from "@/components/ui/sidebar";
import {cookies} from "next/headers";
import EmployeeStatusChart from "@/components/charts/employee-status-chart";
import VacationsStatusChart from "@/components/charts/vacations-status-chart";
import {getUserToken} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getUserData} from "@/lib/api";

async function getGeneralStatistics() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const response = await fetch("http://localhost:8080/api/v1/statistics/general", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export default async function HomePage() {
    const userToken = await getUserToken()
    const userRole = userToken?.role

    if (!userToken) {
        redirect("/")
    }

    const userData = await getUserData(userToken)
    console.log(userData)

    let generalStatistics = null
    if(userRole === "ADMIN") {
        generalStatistics = await getGeneralStatistics()
        console.log(generalStatistics)
    }


    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p>Welcome, {userData.name}!</p>
            <p>Position: {userData.position}</p>
            <p>Pending vacation requests: {userData.vacationRequests.filter((vr) => vr.status === "PENDING").length}</p>
            {userRole === "ADMIN" && (
                <>
                    <p>This is your admin dashboard. Select an option from the sidebar to get started.</p>
                    <EmployeeStatusChart/>
                    <VacationsStatusChart/>
                </>
            )}
        </SidebarInset>
    )
}