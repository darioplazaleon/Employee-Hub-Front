import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VacationRequests {
    id: number
    title: string
    createdAt: string
    approved: string
}

export function VacationRequests({ requests }: { requests: VacationRequests[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vacations requests</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li key={request.id} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold">{request.title}</h3>
                            <p className="text-sm text-gray-500">{request.createdAt}</p>
                            <Badge
                                variant={
                                    request.approved === "APPROVED" ? "success" : request.approved === "REJECTED" ? "destructive" : "default"
                                }
                            >
                                {request.approved === "APPROVED" ? "APPROVED" : request.approved === "REJECTED" ? "REJECTED" : "PENDING"}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

