"use client"

import { useState } from "react"
import { UserList } from "@/components/user-list"
import { UserFilter } from "@/components/user-filter"
import { UserSearch } from "@/components/user-search"

interface User {
    id: number
    name: string
    email: string
    role: "ADMIN" | "MANAGER" | "USER"
    position: string
}

interface UserListClientProps {
    initialUsers: User[]
}

export function UserListClient({ initialUsers }: UserListClientProps) {
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredUsers = initialUsers.filter((user) => {
        const roleMatch = !selectedRole || user.role === selectedRole
        const positionMatch = !selectedPosition || user.position === selectedPosition
        const searchMatch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        return roleMatch && positionMatch && searchMatch
    })

    return (
        <>
            <div className="flex items-center space-x-4 mb-6">
                <UserSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <UserFilter
                    selectedRole={selectedRole}
                    selectedPosition={selectedPosition}
                    onRoleChange={setSelectedRole}
                    onPositionChange={setSelectedPosition}
                />
            </div>
            <UserList users={filteredUsers} />
        </>
    )
}

