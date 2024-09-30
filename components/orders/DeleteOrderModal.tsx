"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { deleteOrder } from "@/server/actions/order-actions";

import { OrderSchema } from "@/types/orders-schema";
import { z } from "zod";

export const DeleteOrderModal = ({
  order,
  open,
  onOpenChange,
}: {
  order: z.infer<typeof OrderSchema>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleDeleteOrder = () => {
    const orderId = order.id;

    if (!orderId) {
      return;
    }

    deleteOrder({ id: orderId });
    toast.success(`Order has been deleted`);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild className="hidden">
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-[#1C1B22] bg-slate-100">
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDeleteOrder}>
                Yes, Delete
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
