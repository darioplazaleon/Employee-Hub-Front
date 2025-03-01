import {SidebarInset} from "@/components/ui/sidebar";
import {cookies} from "next/headers";
import {Card} from "@/components/ui/card";
import EmployeeStatusChart from "@/components/charts/employee-status-chart";
import VacationsStatusChart from "@/components/charts/vacations-status-chart";

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

export default async function HomePage(){

    const data = await getGeneralStatistics()

    console.log(data)

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p>Welcome to your admin dashboard. Select an option from the sidebar to get started.</p>
            <EmployeeStatusChart/>
            <VacationsStatusChart/>
        </SidebarInset>
    )
}