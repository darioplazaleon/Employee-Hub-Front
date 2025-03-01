"use client"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPositions } from "@/lib/api"
import { createUser, updateUser } from "@/actions/user-actions"
import { useFormStatus } from "react-dom"

interface Position {
    id: number
    name: string
}

interface User {
    id?: number
    name: string
    email: string
    positionId: number
    salary: number
    role: "ADMIN" | "MANAGER" | "USER"
}

interface UserFormProps {
    user?: User
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar Usuario"}
        </Button>
    )
}

export function UserForm({ user }: UserFormProps) {
    const [positions, setPositions] = useState<Position[]>([])
    const initialState = { message: null, errors: {} }
    const [state, formAction] = useFormState(user ? updateUser.bind(null, user.id!) : createUser, initialState)

    useEffect(() => {
        async function fetchPositions() {
            const fetchedPositions = await getPositions()
            setPositions(fetchedPositions)
        }
        fetchPositions()
    }, [])

    return (
        <form action={formAction} className="space-y-4 max-w-md">
            {state?.message && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{state.message}</span>
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <Input id="name" name="name" defaultValue={user?.name} required />
                {state?.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Input id="email" name="email" type="email" defaultValue={user?.email} required />
                {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>}
            </div>
            <div>
                <label htmlFor="positionId" className="block text-sm font-medium text-gray-700">
                    Posición
                </label>
                <Select name="positionId" defaultValue={user?.positionId?.toString()}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una posición" />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map((position) => (
                            <SelectItem key={position.id} value={position.id.toString()}>
                                {position.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {state?.errors?.positionId && <p className="mt-1 text-sm text-red-600">{state.errors.positionId[0]}</p>}
            </div>
            <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salario
                </label>
                <Input id="salary" name="salary" type="number" defaultValue={user?.salary?.toString()} required />
                {state?.errors?.salary && <p className="mt-1 text-sm text-red-600">{state.errors.salary[0]}</p>}
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rol
                </label>
                <Select name="role" defaultValue={user?.role}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                </Select>
                {state?.errors?.role && <p className="mt-1 text-sm text-red-600">{state.errors.role[0]}</p>}
            </div>
            <SubmitButton />
        </form>
    )
}

