import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { cookies} from "next/headers";
import {redirect} from "next/navigation";


export default function LoginPage() {

    async function handleSubmit(formData: FormData) {
        "use server"

        // This is where you would typically handle the login logic
        // For example, validate credentials and create a session
        const rawFormData = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        console.log("Login attempt", rawFormData)

        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rawFormData)
        })

        const cookieStore = await cookies()

        if (response.ok) {
            const data = await response.json()
            console.log("Login successful", data)

            cookieStore.set({
                name: "access_token",
                value: data.access_token,
                httpOnly: true,
                maxAge: 86400
            })
            cookieStore.set({
                name: "refresh_token",
                value: data.refresh_token,
                httpOnly: true,
                maxAge: 604800
            })

            redirect("/dashboard")
        } else {
            console.error("Login failed", response)
        }
    }


    return (
        <main className="w-full h-full">
            <div className="flex items-center justify-center min-h-screen bg-gray-500">
                <Card className="w-full max-w-md ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <form action={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    )
}
