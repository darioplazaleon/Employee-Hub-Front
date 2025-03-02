"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { approveVacationRequest, rejectVacationRequest } from "@/actions/vacation-actions"
import { toast } from "sonner"

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

export function VacationRequestDetails({ request }: { request: VacationRequest }) {
    const [status, setStatus] = useState(request.status)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleApprove = async () => {
        setIsLoading(true)
        const result = await approveVacationRequest(request.id)
        setIsLoading(false)
        if (result.success) {
            setStatus("APPROVED")
            toast.success("Vacation request approved")
            router.refresh()
        } else {
            toast.error(result.error || "Error approving the request")
        }
    }

    const handleReject = async () => {
        setIsLoading(true)
        const result = await rejectVacationRequest(request.id)
        setIsLoading(false)
        if (result.success) {
            setStatus("REJECTED")
            toast.success("Vacation request rejected")
            router.refresh()
        } else {
            toast.error(result.error || "Error rejecting the request")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{request.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="font-medium text-gray-500">Employee</dt>
                        <dd className="mt-1">{request.employeeName}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Creation Date</dt>
                        <dd className="mt-1">{new Date(request.createdAt).toLocaleDateString()}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1">{new Date(request.startDate).toLocaleDateString()}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">End Date</dt>
                        <dd className="mt-1">{new Date(request.endDate).toLocaleDateString()}</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="font-medium text-gray-500">Comment</dt>
                        <dd className="mt-1">{request.comment}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Status</dt>
                        <dd className="mt-1">
                            <Badge variant={status === "APPROVED" ? "success" : status === "REJECTED" ? "destructive" : "secondary"}>
                                {status}
                            </Badge>
                        </dd>
                    </div>
                    {request.approvedBy && (
                        <div>
                            <dt className="font-medium text-gray-500">Approved by</dt>
                            <dd className="mt-1">{request.approvedBy}</dd>
                        </div>
                    )}
                </dl>
                {status === "PENDING" && (
                    <div className="mt-6 flex space-x-4">
                        <Button onClick={handleApprove} disabled={isLoading}>
                            {isLoading ? "Processing..." : "Approve"}
                        </Button>
                        <Button onClick={handleReject} variant="destructive" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Reject"}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}