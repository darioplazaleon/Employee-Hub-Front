"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { UserList } from "@/components/user-list"
import { UserFilter } from "@/components/user-filter"
import { UserSearch } from "@/components/user-search"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function UsersListPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <SidebarInset className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">User List</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <UserSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <UserFilter selectedRole={selectedRole} onRoleChange={setSelectedRole} />
            </div>
            <UserList selectedRole={selectedRole} searchQuery={searchQuery} />
        </SidebarInset>
    )
}

