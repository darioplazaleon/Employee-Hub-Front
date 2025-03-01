"use client"

import {useState} from "react"
import Link from "next/link"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {MoreHorizontal, Pencil, Trash2} from 'lucide-react'
import {deleteUser} from "@/actions/user-actions"
import {toast} from 'sonner'

interface User {
    id: number
    name: string
    email: string
    role: "ADMIN" | "MANAGER" | "USER"
    position: {
        id: number
        name: string
    }
    createdAt: string
    isActive: boolean
}

interface UserListProps {
    users: User[]
}

export function UserList({users: initialUsers}: UserListProps) {
    const [users, setUsers] = useState(initialUsers)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)

    const handleDelete = async (userId: number) => {
        const result = await deleteUser(userId)
        if (result.success) {
            setUsers(users.filter(user => user.id !== userId))
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
        setUserToDelete(null)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Created </TableHead>
                        <TableHead>Status </TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                                    {user.name}
                                </Link>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={user.role === "ADMIN" ? "default" : user.role === "MANAGER" ? "secondary" : "outline"}>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.position.name}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell>
                                <Badge variant={user.isActive ? "success" : "destructive"}>
                                    {user.isActive ? "ACTIVE" : "INACTIVE"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Abrir menú</span>
                                            <MoreHorizontal className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/users/${user.id}/edit`}>
                                                <Pencil className="mr-2 h-4 w-4"/>
                                                <span>Edit</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => setUserToDelete(user)}>
                                            <Trash2 className="mr-2 h-4 w-4"/>
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cant be undone. It will delete permanently
                            {userToDelete && ` ${userToDelete.name}`} and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => userToDelete && handleDelete(userToDelete.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

