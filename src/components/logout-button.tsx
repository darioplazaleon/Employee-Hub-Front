"use client"

import { LogOut } from "lucide-react"
import { SidebarMenuSubButton } from "@/components/ui/sidebar"
import { logoutAction } from "@/app/actions/auth-actions"

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <SidebarMenuSubButton type="submit" className="flex items-center w-full">
                {/*<LogOut className="mr-2 h-4 w-4" />*/}
                <span>Logout</span>
            </SidebarMenuSubButton>
        </form>
    )
}