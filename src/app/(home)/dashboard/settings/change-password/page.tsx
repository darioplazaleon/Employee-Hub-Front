import { SidebarInset } from "@/components/ui/sidebar"
import { ChangePasswordForm } from "@/components/change-password-form"
import { getUserToken } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ChangePasswordPage() {
    const userToken = await getUserToken()

    if (!userToken) {
        redirect("/login")
    }

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Change Password</h1>
            <ChangePasswordForm userId={userToken.jti} />
        </SidebarInset>
    )
}

