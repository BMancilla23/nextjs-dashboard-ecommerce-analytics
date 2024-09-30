"use server";

import { actionClient } from "@/lib/safe-action";
import { DeleteOrderSchema, OrderSchema } from "@/types/orders-schema";
import db from "../db";
import { revalidatePath } from "next/cache";

export const addOrder = actionClient
  .schema(OrderSchema)
  .action(
    async ({
      parsedInput: { customerName, address, orderNumber, totalAmount },
    }) => {
      // Check if the order number already exists
      const existingOrder = await db.order.findFirst({
        where: {
          orderNumber: orderNumber,
        },
      });

      // If the order number already exists, return an error
      if (existingOrder) {
        return { error: "Order number already exists" };
      }

      await db.order.create({
        data: {
          customerName: customerName,
          address: address,
          orderNumber: orderNumber,
          totalAmount: totalAmount,
        },
      });
      // Revalidate the path after creating the order
      revalidatePath("/", "layout");

      return { success: "Order added successfully" };
    }
  );

export const deleteOrder = actionClient
  .schema(DeleteOrderSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.order.delete({
      where: { id: id },
    });

    revalidatePath("/", "layout");

    return;
  });
