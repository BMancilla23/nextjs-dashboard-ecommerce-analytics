"use client";

import React from "react";
import { AnalyticsCard } from "./AnalyticsCard";
/* import { ProductsDummyData } from "@/constants/data"; */
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import { formatPrice } from "@/utils/formatPrice";
import { z } from "zod";
import { ProductSchema } from "@/types/product-schema";

/* export type TopProducts = {
  id: number;
  name: string;
  revenue: number;
  price: number;
  image: string;
}; */

export const topProductsColumns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const totalRevenue = row.getValue("revenue") as number;
      return <span>{formatPrice(totalRevenue)}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;

      return (
        <Image
          src={imageUrl}
          alt={"Product Image"}
          width={50}
          height={50}
          className="border-2 border-primary"
        />
      );
    },
  },
];

type TopProductsProps = {
  products: z.infer<typeof ProductSchema>[];
};

export const TopProducts = ({ products }: TopProductsProps) => {
  // Fetch the top 5 products from the dummy data
  // const topProducts = ProductsDummyData.slice(0, 5);

  /*  const topProducts = [...ProductsDummyData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4); */

  const topProducts = [...products]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);

  return (
    <AnalyticsCard title="Top Products" subTitle="Showing Most Sold Products">
      <DataTable columns={topProductsColumns} data={topProducts}></DataTable>
    </AnalyticsCard>
  );
};
