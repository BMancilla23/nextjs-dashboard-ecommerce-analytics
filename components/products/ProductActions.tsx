"use client";

import { ProductSchema } from "@/types/product-schema";
import { z } from "zod";
import { EntityActions } from "../ui/entity-actions";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { useState } from "react";

type ProductActionsProps = {
  product: z.infer<typeof ProductSchema>;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  /* const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  //  const productId = product.id;

  // if (!productId) {
  //   return;
  // }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditModalOpen(true)}>
            Edit Product
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setDeleteModalOpen(true)}>
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductModal
        product={product}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
      <DeleteProductModal
        product={product}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
    </>
  ); */

  return (
    <EntityActions
      label={"product"}
      editModal={
        <EditProductModal
          product={product}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
        />
      }
      deleteModal={
        <DeleteProductModal
          product={product}
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
        />
      }
    />
  );
};
