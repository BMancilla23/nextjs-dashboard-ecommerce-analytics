import { BarGraph } from "@/components/dashboard/BarGraph";
import { HorizontalBarGraph } from "@/components/dashboard/HorizontalBarGraph";
import { PieGraph } from "@/components/dashboard/PieGraph";
import { RadarGraph } from "@/components/dashboard/RadarGraph";
import { Summary } from "@/components/dashboard/Summary";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { TopProducts } from "@/components/dashboard/TopProducts";

import db from "@/server/db";

export default async function Home() {
  const products = await db.product.findMany({});

  const customers = await db.customer.findMany({});

  return (
    <div className="grid gap-5">
      <Summary />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <BarGraph />
        <RadarGraph />

        <TopProducts products={products} />

        <PieGraph />
        <HorizontalBarGraph />

        <TopCustomers customers={customers} />
      </div>
    </div>
  );
}
