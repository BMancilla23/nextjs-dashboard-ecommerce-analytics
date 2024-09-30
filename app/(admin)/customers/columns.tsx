"use client";

import { CustomerActions } from "@/components/customers/CustomerActions";
import { CustomersSchema } from "@/types/customer-schema";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { z } from "zod";

export type Customers = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  orders: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<z.infer<typeof CustomersSchema>>[] = [
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
  /* {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
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
  /*  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt")).toDateString();
      return <span>{updatedAt}</span>;
    },
  }, */
  {
    id: "actions",
    cell: ({ row }) => {
      /* const payment = row.original; */

      const customer = row.original;

      return (
        <>
          <CustomerActions customer={customer} />
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
             <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        </>
      );
    },
  },
];
