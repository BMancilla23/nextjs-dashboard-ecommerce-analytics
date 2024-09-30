import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  LucideIcon,
  Package,
  Shirt,
  Users,
} from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: string;
}

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: SummaryCardProps) => {
  return (
    <div className="p-6 rounded-md flex-auto dark:bg-tertiary bg-slate-100 border">
      <div className="flex items-center gap-5 justify-center max-md:justify-between">
        <div>
          <p className="">{title}</p>
          <h2 className="font-bold text-2xl">{value}</h2>
        </div>
        <div>
          <Icon className="bg-primary text-white p-3 rounded-full" size={50} />
        </div>
      </div>
      <div
        className={`flex gap-1 mt-2 md:justify-center ${
          changeType === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {changeType === "increase" ? (
          <ArrowUp size={20} />
        ) : (
          <ArrowDown size={20} />
        )}
        <span className="text-sm">{change}</span>
      </div>
    </div>
  );
};

export const Summary = () => {
  const summaryData = [
    {
      title: "Orders",
      value: "1,342",
      icon: Package,
      change: "+30% since last year",
      changeType: "increase",
    },
    {
      title: "Revenue",
      value: "$28,072",
      icon: DollarSign,
      change: "-80% since last year",
      changeType: "decrease",
    },
    {
      title: "Customers",
      value: "3,242",
      icon: Users,
      change: "+10% since last year",
      changeType: "increase",
    },
    {
      title: "Products",
      value: "20",
      icon: Shirt,
      change: "-11% since last year",
      changeType: "decrease",
    },
  ];

  return (
    <AnalyticsCard title="Summary" subTitle="2024 Year Summary">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mb-3 w-full">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>
    </AnalyticsCard>
  );
};
