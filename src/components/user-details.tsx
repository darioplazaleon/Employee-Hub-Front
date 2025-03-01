import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface User {
    id: number
    name: string
    email: string
    role: string
    position: string
    salary: number
}

export function UserDetails({ user }: { user: User }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User information</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                        <dt className="font-medium text-gray-500">Name</dt>
                        <dd>{user.name}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Email</dt>
                        <dd>{user.email}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Rol</dt>
                        <dd>
                            <Badge variant={user.role === "ADMIN" ? "default" : user.role === "MANAGER" ? "secondary" : "outline"}>
                                {user.role}
                            </Badge>
                        </dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Position</dt>
                        <dd>{user.position}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Salary</dt>
                        <dd>${user.salary.toLocaleString()}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    )
}

