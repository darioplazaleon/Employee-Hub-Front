import { SidebarInset } from "@/components/ui/sidebar"
import { PositionForm } from "@/components/positions/position-form"

export default function NewPositionPage() {
    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Create new Position</h1>
            <PositionForm />
        </SidebarInset>
    )
}

