import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

interface User {
    id: number
    name: string
    email: string
    role: "ADMIN" | "MANAGER" | "USER"
}

const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "ADMIN" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "MANAGER" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "USER" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "MANAGER" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "USER" },
]

interface UserListProps {
    selectedRole: string | null
    searchQuery: string
}

export function UserList({ selectedRole, searchQuery }: UserListProps) {
    const filteredUsers = users.filter((user) => {
        const roleMatch = !selectedRole || selectedRole === "all" || user.role === selectedRole
        const searchMatch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        return roleMatch && searchMatch
    })

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Badge variant={user.role === "ADMIN" ? "default" : user.role === "MANAGER" ? "secondary" : "outline"}>
                                {user.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

