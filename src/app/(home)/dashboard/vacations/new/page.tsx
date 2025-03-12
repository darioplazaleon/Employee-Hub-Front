import { SidebarInset } from "@/components/ui/sidebar"
import { VacationRequestForm } from "@/components/vacations/vacation-request-form"

export default function NewVacationRequestPage() {
    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Create vacation request</h1>
            <VacationRequestForm />
        </SidebarInset>
    )
}

