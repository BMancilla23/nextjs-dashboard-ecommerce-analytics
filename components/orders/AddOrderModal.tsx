"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderSchema } from "@/types/orders-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { addOrder } from "@/server/actions/order-actions";
import toast from "react-hot-toast";

export const AddOrderModal = () => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerName: "",
      address: "",
      orderNumber: 0,
      totalAmount: 0,
    },
  });

  const { execute, status } = useAction(addOrder, {
    onSuccess(data) {
      if (data.data?.success) {
        toast.success(data.data.success);
        form.reset();
        dialogCloseRef.current?.click();
      } else if (data.data?.error) {
        toast.error(data.data.error);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    execute(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1C1B22] bg-slate-100">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123 Dev Way" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Ammount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1900" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" disabled={status === "executing"}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={status === "executing"}>
                {status === "executing" ? "Adding..." : "Add Order"}
              </Button>
              <DialogClose asChild>
                <Button type="button" className="hidden" ref={dialogCloseRef}>
                  Hidden Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
