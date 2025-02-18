import type React from "react"
import {SidebarProvider} from "@/components/ui/sidebar"
import {AdminSidebar} from "@/components/admin-sidebar"

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <SidebarProvider>
            <div className="flex h-screen">
                <AdminSidebar/>
                {children}
            </div>
        </SidebarProvider>
        </body>
        </html>
    )
}
