import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
/* import { Button } from "@/components/ui/button"; */
import { DataTable } from "@/components/ui/data-table";
/* import { ordersDummyData } from "@/constants/data"; */
import { AddOrderModal } from "@/components/orders/AddOrderModal";
import db from "@/server/db";
import { columns } from "./columns";

export default async function OrdersPage() {
  const orders = await db.order.findMany({});

  return (
    <div className="grid grid-cols-1">
      <AnalyticsCard title="Orders" subTitle="Showing All Orders">
        {/*  <Button className="mb-3">Create New Order</Button> */}
        <AddOrderModal />
        <DataTable columns={columns} data={orders} />
      </AnalyticsCard>
    </div>
  );
}
