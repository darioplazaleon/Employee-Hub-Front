import { notFound } from "next/navigation"
import { SidebarInset } from "@/components/ui/sidebar"
import { PositionForm } from "@/components/positions/position-form"
import {cookies} from "next/headers";

async function getPosition(id: string) {
   const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    const response = await fetch(`http://localhost:8080/api/v1/positions/get/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response.ok ? await response.json() : notFound()
}

export default async function EditPositionPage({ params }: { params: { id: string } }) {
    const parameters = await params
    const id = parameters.id

    const position = await getPosition(id)

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Edit position</h1>
            <PositionForm position={position} />
        </SidebarInset>
    )
}

