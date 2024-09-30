import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { ProductSchema } from "@/types/product-schema";
import { deleteProduct } from "@/server/actions/product-actions";
import toast from "react-hot-toast";

export const DeleteProductModal = ({
  product,
  open,
  onOpenChange,
}: {
  product: z.infer<typeof ProductSchema>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleDeleteProduct = () => {
    const productId = product.id;

    if (!productId) {
      return;
    }

    deleteProduct({ id: productId });
    toast.success("Item has been deleted");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="hidden" asChild>
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-[#1C1B22] bg-slate-100">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Yes, Delete
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
