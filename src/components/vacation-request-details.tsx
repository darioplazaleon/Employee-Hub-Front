"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    const router = useRouter()

    const handleApprove = async () => {
        // En una aplicación real, aquí harías una llamada a la API para aprobar la solicitud
        setStatus("APPROVED")
        // Simular una llamada a la API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.refresh()
    }

    const handleReject = async () => {
        // En una aplicación real, aquí harías una llamada a la API para rechazar la solicitud
        setStatus("REJECTED")
        // Simular una llamada a la API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{request.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="font-medium text-gray-500">Empleado</dt>
                        <dd className="mt-1">{request.employeeName}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Fecha de Creación</dt>
                        <dd className="mt-1">{new Date(request.createdAt).toLocaleDateString()}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Fecha de Inicio</dt>
                        <dd className="mt-1">{new Date(request.startDate).toLocaleDateString()}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Fecha de Fin</dt>
                        <dd className="mt-1">{new Date(request.endDate).toLocaleDateString()}</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="font-medium text-gray-500">Comentario</dt>
                        <dd className="mt-1">{request.comment}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Estado</dt>
                        <dd className="mt-1">
                            <Badge variant={status === "APPROVED" ? "success" : status === "REJECTED" ? "destructive" : "secondary"}>
                                {status}
                            </Badge>
                        </dd>
                    </div>
                    {request.approvedBy && (
                        <div>
                            <dt className="font-medium text-gray-500">Aprobado por</dt>
                            <dd className="mt-1">{request.approvedBy}</dd>
                        </div>
                    )}
                </dl>
                {status === "PENDING" && (
                    <div className="mt-6 flex space-x-4">
                        <Button onClick={handleApprove} variant="default">
                            Aprobar
                        </Button>
                        <Button onClick={handleReject} variant="destructive">
                            Rechazar
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

