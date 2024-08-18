"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
import { IconBadge } from "@/components/icon-badge"
import { Users } from "lucide-react"

export function EnrollmentPieChart({ courseStats }) {
    const courseStatsWithColor =
        courseStats.map((c, idx) => {
            const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
            const randomColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
            return {
                title: c?.title,
                enrolled: c?.enrolled,
                fill: randomColor 
            }
        })
    const totalEnrollments = React.useMemo(() => {
        return courseStatsWithColor.reduce((acc, curr) => acc + curr.enrolled, 0)
    }, []);

    return (
        <Card className="flex flex-col mb-[18px]">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-sm font-medium">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Users} />
                        <h2 className="text-xl">Enrollments</h2>
                    </div>
                </CardTitle>
                <CardDescription>All enrollments on your courses</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={ChartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={courseStatsWithColor}
                            dataKey="enrolled"
                            nameKey="title"
                            innerRadius={55}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalEnrollments.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total <br />enrollments
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total enrollment of the students in your course.
                </div>
            </CardFooter>
        </Card>
    )
}