"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalyticsCard } from "./AnalyticsCard";

const chartData = [
  { country: "USA", visitors: 275, fill: "#A88BE5" },
  { country: "India", visitors: 200, fill: "#8A46E0" },
  { country: "China", visitors: 187, fill: "#5F3B96" },
  { country: "Cuba", visitors: 173, fill: "#8571CF" },
  { country: "Brazil", visitors: 90, fill: "#905CDB" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  USA: {
    label: "USA",
  },
  India: {
    label: "India",
  },
  China: {
    label: "China",
  },
  Cuba: {
    label: "Cuba",
  },
  Brazil: {
    label: "Brazil",
  },
} satisfies ChartConfig;

export const HorizontalBarGraph = () => {
  return (
    <AnalyticsCard
      title="Traffic Bar Chart"
      subTitle="Showing Visitors from Different Countries"
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-h-[400px] mt-10"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="country"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </AnalyticsCard>
  );
};
