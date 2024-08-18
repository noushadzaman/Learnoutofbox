"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export function EnrollmentDateBarChart({ dateWiseEnrollments }) {
    const enrollments = dateWiseEnrollments.map(d => {
        const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
        const randomColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
        return {
            month: d?.month,
            enrollments: d?.enrollments.length,
            fill: randomColor
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enrollments by date</CardTitle>
                <CardDescription>Enrollments within Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={ChartConfig}>
                    <BarChart accessibilityLayer data={enrollments}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="enrollments" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total enrollments for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}
