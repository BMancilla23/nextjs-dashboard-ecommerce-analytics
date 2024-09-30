"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AnalyticsCard } from "./AnalyticsCard";
import { DataTable } from "../ui/data-table";
/* import { CustomersDummyData } from "@/constants/data"; */
import { z } from "zod";
import { CustomersSchema } from "@/types/customer-schema";
import Image from "next/image";

/* export type TopCustomers = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  orders: number;
  createdAt: Date;
  updatedAt: Date;
}; */

export const topCutomersColumns: ColumnDef<z.infer<typeof CustomersSchema>>[] =
  [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string;

        return (
          <div className="relative w-full h-12 aspect-square overflow-hidden">
            <Image
              src={imageUrl ?? "/default-image.png"}
              alt={"Product Image"}
              fill
              className="object-contain"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    /*   {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    }, */
    /*  {
      accessorKey: "address",
      header: "Address",
    }, */
    {
      accessorKey: "orders",
      header: "Orders",
      cell: ({ row }) => <span>{row.getValue("orders")}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = new Date(row.getValue("createdAt")).toDateString();
        return <span>{createdAt}</span>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const updatedAt = new Date(row.getValue("updatedAt")).toDateString();
        return <span>{updatedAt}</span>;
      },
    },
  ];

type TopCustomerProps = {
  customers: z.infer<typeof CustomersSchema>[];
};

export const TopCustomers = ({ customers }: TopCustomerProps) => {
  /* const topCustomers: TopCustomers[] = [...CustomersDummyData].slice(0, 4); */

  const topCustomers = [...customers].slice(0, 4);

  return (
    <AnalyticsCard title="Top Customers" subTitle="Showing Most Sold Customers">
      <DataTable columns={topCutomersColumns} data={topCustomers} />
    </AnalyticsCard>
  );
};
