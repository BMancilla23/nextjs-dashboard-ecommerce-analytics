"use client";

import { OrderActions } from "@/components/orders/OrderActions";
import { OrderSchema } from "@/types/orders-schema";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

/* export type Orders = {
  id: string | number;
  orderNumber: string;
  totalAmount: number;
  date: number;
}; */

export const columns: ColumnDef<z.infer<typeof OrderSchema>>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number;
      return <span>{formatPrice(totalAmount)}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateTimeStamp = row.getValue("date") as number;

      const dataObject = new Date(dateTimeStamp);

      return <span className="text-nowrap">{formatDate(dataObject)}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      /* const payment = row.original; */

      const order = row.original;

      return (
        /* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
             <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Order Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */

        <OrderActions order={order} />
      );
    },
  },
];
