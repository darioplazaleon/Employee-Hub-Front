"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface VacationRequest {
    id: number
    title: string
    createdAt: string
    startDate: string
    endDate: string
    comment: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    employeeName: string
    approvedBy: string | null
}

interface VacationRequestsListWithFiltersProps {
    initialRequests: VacationRequest[]
}

export function VacationRequestsListWithFilters({ initialRequests }: VacationRequestsListWithFiltersProps) {
    const [requests, setRequests] = useState<VacationRequest[]>(initialRequests)
    const [statusFilter, setStatusFilter] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState<string>("")

    const filteredRequests = requests.filter((request) => {
        const statusMatch = !statusFilter || request.status === statusFilter
        const dateMatch = !dateFilter || new Date(request.createdAt) >= new Date(dateFilter)
        return statusMatch && dateMatch
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vacations request</CardTitle>
                <div className="flex space-x-4 mt-4">
                    <Select onValueChange={(value) => setStatusFilter(value === "ALL" ? null : value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="date"
                        placeholder="Filtrar por fecha de creación"
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {filteredRequests.map((request) => (
                        <Link href={`/dashboard/vacations/${request.id}`} key={request.id}>
                            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                <h3 className="font-semibold">{request.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">Created: {new Date(request.createdAt).toLocaleDateString()}</p>
                                <Badge
                                    variant={
                                        request.status === "APPROVED" ? "success" : request.status === "REJECTED" ? "destructive" : "default"
                                    }
                                >
                                    {request.status}
                                </Badge>
                                <p className="text-sm text-gray-500">Employee: {request.employeeName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

