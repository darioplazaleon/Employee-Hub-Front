import { SidebarInset } from "@/components/ui/sidebar"
import { UserForm } from "@/components/user-form"

export default function NewUserPage() {
    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Create new employee</h1>
            <UserForm />
        </SidebarInset>
    )
}

