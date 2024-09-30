"use client";

import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UploadButton } from "@/app/api/uploadthing/upload";
import { updateProduct } from "@/server/actions/product-actions";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const EditProductModal = ({
  product,
  open,
  onOpenChange,
}: {
  product: z.infer<typeof ProductSchema>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product,
  });

  const [imageUploading, setImageUploading] = useState(false);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { execute, status } = useAction(updateProduct, {
    onSuccess(data) {
      if (data.data?.success) {
        toast.success(data.data.success);
        dialogCloseRef.current?.click();
      } else if (data.data?.error) {
        toast.error(data.data.error);
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    execute(values);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="hidden">
        <Button>Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1C1B22] bg-slate-100">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem>
                  <FormLabel>Change Image:</FormLabel>
                  <div className="flex sm:flex-row flex-col justify-center items-center gap-10">
                    {!form.getValues("image") && (
                      <div className="relative w-24 h-24 aspect-square overflow-hidden ">
                        <Image
                          src={"/default-product.png"}
                          fill
                          alt="image of product"
                          className="object-cover"
                        />
                      </div>
                    )}
                    {form.getValues("image") && (
                      <div className="relative w-24 h-24 aspect-square overflow-hidden ">
                        <Image
                          src={
                            form.getValues("image") ?? "/default-product.png"
                          }
                          fill
                          alt="image of product"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <UploadButton
                      endpoint="imageUploader"
                      onUploadBegin={() => {
                        setImageUploading(true);
                      }}
                      onUploadError={(error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        setImageUploading(false);
                        return;
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Product name"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Revenue"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Price"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={status === "executing" || imageUploading}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={status === "executing" || imageUploading}
              >
                {status === "executing" ? "Updating..." : "Save Changes"}
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
