"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalyticsCard } from "./AnalyticsCard";

export const description = "A pie chart with a label list";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#A88BE5",
  },
  safari: {
    label: "Safari",
    color: "#8A46E0",
  },
  firefox: {
    label: "Firefox",
    color: "#5F3B96",
  },
  edge: {
    label: "Edge",
    color: "#8571CF",
  },
  other: {
    label: "Other",
    color: "#905CDB",
  },
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <AnalyticsCard
      title="Traffic Pie Chart"
      subTitle="Showing Visitors from different browsers"
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            label={{ fill: "#ffffff", fontSize: 12 }}
          >
            <LabelList
              dataKey="browser"
              className="fill-background"
              fill="#ffffff"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
              // Color of label
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </AnalyticsCard>
  );
}
