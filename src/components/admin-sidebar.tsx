import Link from "next/link"
import {ChevronDown, LayoutDashboard, Users, TreePalm, Settings, PlusCircle} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button"
import {getUserToken} from "@/lib/auth";
import {LogoutButton} from "@/components/logout-button";

export async function AdminSidebar() {

    const userToken = await getUserToken()

    const canAccessUsers = userToken?.role === "ADMIN" || userToken?.role === "MANAGER"
    const canAccessPositions = userToken?.role === "ADMIN"
    const canCreateUser = userToken?.role === "ADMIN"
    const canCreatePositions = userToken?.role === "ADMIN"

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="mr-2 h-4 w-4"/>
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {canAccessUsers && (
                                <Collapsible>
                                    <SidebarMenuItem className="flex flex-col">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Users className="mr-2 h-4 w-4"/>
                                                <span>Users</span>
                                                <ChevronDown className="ml-auto h-4 w-4"/>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href="/dashboard/users">User List</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href="/dashboard/users/positions">User Positions</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )}
                            <Collapsible>
                                <SidebarMenuItem className="flex flex-col">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <TreePalm className="mr-2 h-4 w-4"/>
                                            <span>Vacation requests</span>
                                            <ChevronDown className="ml-auto h-4 w-4"/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href="/dashboard/vacations/">Vacations list</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible>
                                <SidebarMenuItem className="flex flex-col">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Settings className="mr-2 h-4 w-4"/>
                                            <span>Settings</span>
                                            <ChevronDown className="ml-auto h-4 w-4"/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href="/dashboard/settings/change-password">Change Password</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <LogoutButton/>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {canCreateUser && (
                <SidebarFooter className="p-4">
                    <Button className="w-full" asChild>
                        <Link href="/dashboard/users/new">
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add User
                        </Link>
                    </Button>
                </SidebarFooter>
            )}
        </Sidebar>
    )
}

