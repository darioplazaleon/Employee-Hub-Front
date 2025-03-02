import {SidebarInset} from "@/components/ui/sidebar"
import {PositionList} from "@/components/positions/position-list"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {PlusCircle} from "lucide-react"
import {cookies} from "next/headers";

// Simulated fetch function - replace with your actual API call
async function getPositions() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    const response = await fetch("http://localhost:8080/api/v1/positions/get-all", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return await response.json()
}

export default async function PositionsPage() {
    const positions = await getPositions()

    return (
        <SidebarInset className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Positions List</h1>
                <Button asChild>
                    <Link href="/dashboard/users/positions/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add position
                    </Link>
                </Button>
            </div>
            <PositionList
                initialPositions={positions}
            />
        </SidebarInset>
    )
}

