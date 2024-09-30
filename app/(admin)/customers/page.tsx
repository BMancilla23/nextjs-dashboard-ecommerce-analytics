import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { DataTable } from "@/components/ui/data-table";
/* import { CustomersDummyData } from "@/constants/data"; */
import { columns } from "./columns";
import AddCustomerModal from "@/components/customers/AddCustomerModal";
import db from "@/server/db";

export default async function CustomersPage() {
  /* const data = [...CustomersDummyData]; */

  const customers = await db.customer.findMany({});

  return (
    <div className="grid grid-cols-1">
      <AnalyticsCard
        title={"Customers"}
        subTitle={"Showing all customers with orders"}
      >
        {/* <Button>Add New Customer</Button> */}
        <AddCustomerModal />
        <DataTable columns={columns} data={customers} />
      </AnalyticsCard>
    </div>
  );
}
