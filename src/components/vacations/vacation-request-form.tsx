"use client"

import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createVacationRequest } from "@/app/actions/vacation-actions"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Sending..." : "Submit Request"}
        </Button>
    )
}

export function VacationRequestForm() {
    const router = useRouter()
    const initialState = { message: null, errors: {} }
    const [state, formAction] = useFormState(createVacationRequest, initialState)

    if (state?.success) {
        toast.success("Vacation request created successfully")
        router.push("/dashboard/vacations")
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Vacation Request</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    {state?.message && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{state.message}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Input id="title" name="title" required />
                        {state?.errors?.title && <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <Input id="startDate" name="startDate" type="date" required />
                        {state?.errors?.startDate && <p className="mt-1 text-sm text-red-600">{state.errors.startDate[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date
                        </label>
                        <Input id="endDate" name="endDate" type="date" required />
                        {state?.errors?.endDate && <p className="mt-1 text-sm text-red-600">{state.errors.endDate[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comment
                        </label>
                        <Textarea id="comment" name="comment" rows={4} />
                        {state?.errors?.comment && <p className="mt-1 text-sm text-red-600">{state.errors.comment[0]}</p>}
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    )
}