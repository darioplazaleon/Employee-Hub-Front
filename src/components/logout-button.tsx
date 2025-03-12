"use client"

import {SidebarMenuSubButton} from "@/components/ui/sidebar"
import {logoutAction} from "@/app/actions/auth-actions"

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <SidebarMenuSubButton type="submit" className="flex items-center w-full">
                <button>
                    <span>Logout</span>
                </button>
            </SidebarMenuSubButton>
        </form>
    )
}