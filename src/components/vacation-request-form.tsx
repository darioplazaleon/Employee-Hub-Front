"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function VacationRequestForm() {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [comment, setComment] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // En una aplicación real, aquí harías una llamada a la API para crear la solicitud
        console.log({ title, startDate, endDate, comment })
        // Simular una llamada a la API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/vacation-requests")
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nueva Solicitud de Vacaciones</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título
                        </label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Fecha de Inicio
                        </label>
                        <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            Fecha de Fin
                        </label>
                        <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comentario
                        </label>
                        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
                    </div>
                    <Button type="submit">Enviar Solicitud</Button>
                </form>
            </CardContent>
        </Card>
    )
}

