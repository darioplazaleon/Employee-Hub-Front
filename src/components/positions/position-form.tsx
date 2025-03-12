"use client"

import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPosition, updatePosition } from "@/app/actions/position-actions"
import { useFormStatus } from "react-dom"

interface Position {
    id?: number
    name: string
    description?: string
}

interface PositionFormProps {
    position?: Position
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar Posición"}
        </Button>
    )
}

export function PositionForm({ position }: PositionFormProps) {
    const initialState = { message: null, errors: {} }
    const [state, formAction] = useFormState(
        position ? updatePosition.bind(null, position.id!) : createPosition,
        initialState,
    )

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
                    Name
                </label>
                <Input id="name" name="name" defaultValue={position?.name} required />
                {state?.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>}
            </div>
            {/*<div>*/}
            {/*    <label htmlFor="description" className="block text-sm font-medium text-gray-700">*/}
            {/*        Descripción*/}
            {/*    </label>*/}
            {/*    <Textarea id="description" name="description" defaultValue={position?.description} rows={3} />*/}
            {/*    {state?.errors?.description && <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>}*/}
            {/*</div>*/}
            <SubmitButton />
        </form>
    )
}

