'use client'

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label, Pie, PieChart} from "recharts";
import {useMemo} from "react";

const chartData = [
    { name: 'Active', value: 400, fill: 'var(--color-active)' },
    { name: 'Inactive', value: 300, color: 'var(--color-inactive)' },
]

const chartConfig = {
    employees: {
      label: 'Employees',
    },
    active: {
        label: 'Active',
        color: 'hsl(var(--chart-1))',
    },
    inactive: {
        label: 'Inactive',
        color: 'hsl(var(--chart-5))',
    }
} satisfies ChartConfig

export default function EmployeeStatusChart() {

    const totalEmployees = useMemo(() => {
        return chartData.reduce((total, item) => total + item.value, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Employees by status</CardTitle>
                <CardDescription>March 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            <Label content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                {totalEmployees.toLocaleString()}
                                            </tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                Employees
                                            </tspan>
                                        </text>
                                    )
                                }
                            }} />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div>Showing current employees status</div>
            </CardFooter>
        </Card>
    )
}