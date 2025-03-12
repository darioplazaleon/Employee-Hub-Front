"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { changePasswordAction } from "@/app/actions/auth-actions"
import { useEffect } from "react"

interface ChangePasswordFormProps {
    userId: number
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Changing Password..." : "Change Password"}
        </Button>
    )
}

export function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            return await changePasswordAction(userId, formData)
        },
        { success: false, errors: {}, message: "" },
    )

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                const form = document.getElementById("change-password-form") as HTMLFormElement
                if (form) form.reset()
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Change Your Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="change-password-form" action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="currentPassword" className="text-sm font-medium">
                            Current Password
                        </label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className={state.errors?.currentPassword ? "border-red-500" : ""}
                        />
                        {state.errors?.currentPassword && <p className="text-sm text-red-500">{state.errors.currentPassword}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="newPassword" className="text-sm font-medium">
                            New Password
                        </label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={state.errors?.newPassword ? "border-red-500" : ""}
                        />
                        {state.errors?.newPassword && <p className="text-sm text-red-500">{state.errors.newPassword}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm New Password
                        </label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={state.errors?.confirmPassword ? "border-red-500" : ""}
                        />
                        {state.errors?.confirmPassword && <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>}
                    </div>

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    )
}

