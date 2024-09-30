"use client";

import { UploadButton } from "@/app/api/uploadthing/upload";
import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useRef, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { addProduct } from "@/server/actions/product-actions";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

export const AddProductModal = () => {
  // Configuración del formulario con la validación de Zod basada en el esquema de producto
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      image: "",
      name: "",
      revenue: 0,
      price: 0,
    },
  });

  // Estado local para manejar la carga de la imagen
  const [imageUploading, setImageUploading] = useState(false);

  // Referencia para el botón oculto de cierre del diálogo (modal)
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // Hook 'usAction' para gestionar la acción de agregar un producto
  const { execute, status } = useAction(addProduct, {
    // Lógica a ejecutar cuando la acción de agregar es exitosa
    onSuccess(data) {
      // Mostrar notificación de éxito
      if (data.data?.success) {
        toast.success(data.data.success);
        // Resetear el formulario después de agregar el producto
        form.reset();
        // Simular clic en el botón de cierre del diálogo
        dialogCloseRef.current?.click();
      } else if (data.data?.error) {
        // Mostrar notificación de error
        toast.error(data.data.error);
      }
    },
  });
  // Función de envío de formulario que ejecuta la acción de agregar producto
  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    execute(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1C1B22] bg-slate-100">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
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
                      <div className="relative w-full h-24 aspect-square overflow-hidden ">
                        <Image
                          src={
                            form.getValues("image") ?? "/default-product.png"
                          }
                          fill
                          alt="image of product"
                          className="object-contain"
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
                  {/*    <FormDescription>
                    Well send you a confirmation email to this address.
                  </FormDescription> */}
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

                  {/* <FormDescription>
                    Your password should be at least 8 characters long and contain
                    at least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </FormDescription> */}
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

                  {/* <FormDescription>
                    Your password should be at least 8 characters long and contain
                    at least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </FormDescription> */}
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
                {status === "executing" ? "Adding..." : "Add Product"}
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
