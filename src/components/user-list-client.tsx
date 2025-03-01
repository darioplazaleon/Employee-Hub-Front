"use client"

import { useState, useEffect } from "react"
import { UserList } from "@/components/user-list"
import { UserFilter } from "@/components/user-filter"
import { UserSearch } from "@/components/user-search"

interface Position {
    id: number
    name: string
}

interface User {
    id: number
    name: string
    email: string
    role: "ADMIN" | "MANAGER" | "USER"
    position: Position
}

interface UserListClientProps {
    initialUsers: User[]
    positions: Position[]
}

export function UserListClient({ initialUsers, positions }: UserListClientProps) {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [selectedPosition, setSelectedPosition] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        setUsers(initialUsers)
    }, [initialUsers])

    const filteredUsers = users.filter((user) => {
        const roleMatch = !selectedRole || user.role === selectedRole
        const positionMatch = !selectedPosition || user.position.id === selectedPosition
        const searchMatch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        return roleMatch && positionMatch && searchMatch
    })

    const handleUserDeleted = (deletedUserId: number) => {
        setUsers(users.filter((user) => user.id !== deletedUserId))
    }

    return (
        <>
            <div className="flex items-center space-x-4 mb-6">
                <UserSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <UserFilter
                    selectedRole={selectedRole}
                    selectedPosition={selectedPosition}
                    positions={positions}
                    onRoleChange={setSelectedRole}
                    onPositionChange={setSelectedPosition}
                />
            </div>
            <UserList users={filteredUsers} onUserDeleted={handleUserDeleted} />
        </>
    )
}

