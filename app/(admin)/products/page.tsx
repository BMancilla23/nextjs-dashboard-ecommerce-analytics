import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { DataTable } from "@/components/ui/data-table";
/* import { ProductsDummyData } from "@/constants/data"; */
import { AddProductModal } from "@/components/products/AddProductModal";
import db from "@/server/db";
import { columns } from "./columns";

export default async function ProductsPage() {
  const productData = await db.product.findMany({});

  return (
    <div className="grid grid-cols-1">
      <AnalyticsCard title="Products" subTitle="Showing All Products">
        {/* <Button className="mb-3">Create New Product</Button> */}
        <AddProductModal />
        <DataTable columns={columns} data={productData} />
      </AnalyticsCard>
    </div>
  );
}
