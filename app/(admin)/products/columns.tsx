"use client";

import { ProductActions } from "@/components/products/ProductActions";
import { ProductSchema } from "@/types/product-schema";
import { formatPrice } from "@/utils/formatPrice";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { z } from "zod";

/* export type Products = {
  id: number;
  name: string;
  revenue: number;
  price: number;
  image: string;
}; */

/* 
  Definición de las columnas de la tabla.
  Se utiliza "ColumnDef" para definir cómo se comportan y se muestran las columnas en la tabla.
  Cada columna tiene configurado un "accessorKey" que define el campo de acceso al dato.
  También se pueden personalizar las celdas con la propiedad "cell".
*/
export const columns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  /* 
      "accessorKey" define qué propiedad del objeto producto será mostrada en la columna.
      En este caso, estamos accediendo al campo "name" para mostrar el nombre del producto.
    */
  {
    accessorKey: "name",
    header: "Name", // Texto del encabezado de la columna
  },
  {
    /*
      Esta columna accede a la propiedad "revenue" del producto.
      Personalizamos la celda con una función en "cell" para formatear el valor como precio.
    */
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      /*
        "row" contiene la fila completa del producto.
        "getValue" nos permite obtener el valor de una columna específica, en este caso "revenue".
      */
      const totalRevenue = row.getValue("revenue") as number;
      return <span>{formatPrice(totalRevenue)}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const totalPrice = row.getValue("price") as number;
      return <span>{formatPrice(totalPrice)}</span>;
    },
  },
  {
    /*
      Esta columna accede al campo "image" del producto.
      En "cell" personalizamos la celda para mostrar una imagen usando el componente "Image" de Next.js.
    */
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;

      return (
        <div className="relative w-full h-12 aspect-square overflow-hidden">
          <Image
            src={imageUrl ?? "/default-product.png"}
            alt={"Product Image"}
            fill
            className="object-contain"
          />
        </div>
      );
    },
  },
  {
    /*
      "id" se usa aquí en lugar de "accessorKey" porque es una columna de acciones que no corresponde a un campo específico.
      En "cell" se personaliza la celda para mostrar las acciones (editar, eliminar) del producto.
    */
    id: "actions",
    cell: ({ row }) => {
      /*
        "row.original" contiene el objeto original del producto.
        Se pasa este objeto al componente "ProductActions", que maneja las acciones como editar y eliminar.
      */
      const product = row.original;

      return (
        <>
          <ProductActions product={product} />
        </>
      );
    },
  },
];
