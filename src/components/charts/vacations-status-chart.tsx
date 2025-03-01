'use client'

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Bar, BarChart, CartesianGrid, Rectangle, XAxis} from "recharts";

const chartData = [
    {status: "pending", value: 300, fill: "var(--color-pending)"},
    {status: "approved", value: 200, fill: "var(--color-approved)"},
    {status: "rejected", value: 100, fill: "var(--color-rejected)"}
]

const chartConfig = {
    vacations: {
        label: "Vacations"
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-1))"
    },
    approved: {
        label: "Approved",
        color: "hsl(var(--chart-5))"
    },
    rejected: {
        label: "Rejected",
        color: "hsl(var(--chart-4))"
    }
} satisfies ChartConfig

export default function VacationsStatusChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vacations by status</CardTitle>
                <CardDescription>March 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis dataKey="status"
                               tickLine={false}
                               tickMargin={10}
                               axisLine={false}
                               tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
                        <Bar dataKey="value" strokeWidth={2} radius={8} activeIndex={2} activeBar={({...props}) => {
                            return (
                                <Rectangle {...props} fillOpacity={0.8} stroke={props.payload.fill} strokeDasharray={4}
                                           strokeDashoffset={4}/>
                            )
                        }}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}