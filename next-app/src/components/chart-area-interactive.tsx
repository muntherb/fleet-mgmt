"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", trucks: 222, fleet: 150 },
  { date: "2024-04-02", trucks: 97, fleet: 180 },
  { date: "2024-04-03", trucks: 167, fleet: 120 },
  { date: "2024-04-04", trucks: 242, fleet: 260 },
  { date: "2024-04-05", trucks: 373, fleet: 290 },
  { date: "2024-04-06", trucks: 301, fleet: 340 },
  { date: "2024-04-07", trucks: 245, fleet: 180 },
  { date: "2024-04-08", trucks: 409, fleet: 320 },
  { date: "2024-04-09", trucks: 59, fleet: 110 },
  { date: "2024-04-10", trucks: 261, fleet: 190 },
  { date: "2024-04-11", trucks: 327, fleet: 350 },
  { date: "2024-04-12", trucks: 292, fleet: 210 },
  { date: "2024-04-13", trucks: 342, fleet: 380 },
  { date: "2024-04-14", trucks: 137, fleet: 220 },
  { date: "2024-04-15", trucks: 120, fleet: 170 },
  { date: "2024-04-16", trucks: 138, fleet: 190 },
  { date: "2024-04-17", trucks: 446, fleet: 360 },
  { date: "2024-04-18", trucks: 364, fleet: 410 },
  { date: "2024-04-19", trucks: 243, fleet: 180 },
  { date: "2024-04-20", trucks: 89, fleet: 150 },
  { date: "2024-04-21", trucks: 137, fleet: 200 },
  { date: "2024-04-22", trucks: 224, fleet: 170 },
  { date: "2024-04-23", trucks: 138, fleet: 230 },
  { date: "2024-04-24", trucks: 387, fleet: 290 },
  { date: "2024-04-25", trucks: 215, fleet: 250 },
  { date: "2024-04-26", trucks: 75, fleet: 130 },
  { date: "2024-04-27", trucks: 383, fleet: 420 },
  { date: "2024-04-28", trucks: 122, fleet: 180 },
  { date: "2024-04-29", trucks: 315, fleet: 240 },
  { date: "2024-04-30", trucks: 454, fleet: 380 },
  { date: "2024-05-01", trucks: 165, fleet: 220 },
  { date: "2024-05-02", trucks: 293, fleet: 310 },
  { date: "2024-05-03", trucks: 247, fleet: 190 },
  { date: "2024-05-04", trucks: 385, fleet: 420 },
  { date: "2024-05-05", trucks: 481, fleet: 390 },
  { date: "2024-05-06", trucks: 498, fleet: 520 },
  { date: "2024-05-07", trucks: 388, fleet: 300 },
  { date: "2024-05-08", trucks: 149, fleet: 210 },
  { date: "2024-05-09", trucks: 227, fleet: 180 },
  { date: "2024-05-10", trucks: 293, fleet: 330 },
  { date: "2024-05-11", trucks: 335, fleet: 270 },
  { date: "2024-05-12", trucks: 197, fleet: 240 },
  { date: "2024-05-13", trucks: 197, fleet: 160 },
  { date: "2024-05-14", trucks: 448, fleet: 490 },
  { date: "2024-05-15", trucks: 473, fleet: 380 },
  { date: "2024-05-16", trucks: 338, fleet: 400 },
  { date: "2024-05-17", trucks: 499, fleet: 420 },
  { date: "2024-05-18", trucks: 315, fleet: 350 },
  { date: "2024-05-19", trucks: 235, fleet: 180 },
  { date: "2024-05-20", trucks: 177, fleet: 230 },
  { date: "2024-05-21", trucks: 82, fleet: 140 },
  { date: "2024-05-22", trucks: 81, fleet: 120 },
  { date: "2024-05-23", trucks: 252, fleet: 290 },
  { date: "2024-05-24", trucks: 294, fleet: 220 },
  { date: "2024-05-25", trucks: 201, fleet: 250 },
  { date: "2024-05-26", trucks: 213, fleet: 170 },
  { date: "2024-05-27", trucks: 420, fleet: 460 },
  { date: "2024-05-28", trucks: 233, fleet: 190 },
  { date: "2024-05-29", trucks: 78, fleet: 130 },
  { date: "2024-05-30", trucks: 340, fleet: 280 },
  { date: "2024-05-31", trucks: 178, fleet: 230 },
  { date: "2024-06-01", trucks: 178, fleet: 200 },
  { date: "2024-06-02", trucks: 470, fleet: 410 },
  { date: "2024-06-03", trucks: 103, fleet: 160 },
  { date: "2024-06-04", trucks: 439, fleet: 380 },
  { date: "2024-06-05", trucks: 88, fleet: 140 },
  { date: "2024-06-06", trucks: 294, fleet: 250 },
  { date: "2024-06-07", trucks: 323, fleet: 370 },
  { date: "2024-06-08", trucks: 385, fleet: 320 },
  { date: "2024-06-09", trucks: 438, fleet: 480 },
  { date: "2024-06-10", trucks: 155, fleet: 200 },
  { date: "2024-06-11", trucks: 92, fleet: 150 },
  { date: "2024-06-12", trucks: 492, fleet: 420 },
  { date: "2024-06-13", trucks: 81, fleet: 130 },
  { date: "2024-06-14", trucks: 426, fleet: 380 },
  { date: "2024-06-15", trucks: 307, fleet: 350 },
  { date: "2024-06-16", trucks: 371, fleet: 310 },
  { date: "2024-06-17", trucks: 475, fleet: 520 },
  { date: "2024-06-18", trucks: 107, fleet: 170 },
  { date: "2024-06-19", trucks: 341, fleet: 290 },
  { date: "2024-06-20", trucks: 408, fleet: 450 },
  { date: "2024-06-21", trucks: 169, fleet: 210 },
  { date: "2024-06-22", trucks: 317, fleet: 270 },
  { date: "2024-06-23", trucks: 480, fleet: 530 },
  { date: "2024-06-24", trucks: 132, fleet: 180 },
  { date: "2024-06-25", trucks: 141, fleet: 190 },
  { date: "2024-06-26", trucks: 434, fleet: 380 },
  { date: "2024-06-27", trucks: 448, fleet: 490 },
  { date: "2024-06-28", trucks: 149, fleet: 200 },
  { date: "2024-06-29", trucks: 103, fleet: 160 },
  { date: "2024-06-30", trucks: 446, fleet: 400 },
];

const chartConfig = {
  vehicles: {
    label: "Vehicles",
  },
  trucks: {
    label: "Trucks",
    color: "var(--primary)",
  },
  fleet: {
    label: "Fleet",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Vehicles</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="fleet"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="trucks"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
