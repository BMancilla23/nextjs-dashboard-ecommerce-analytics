"use client";

import { z } from "zod";
import { EntityActions } from "../ui/entity-actions";
import { OrderSchema } from "@/types/orders-schema";
import { useState } from "react";
import ViewOrderModal from "./ViewOrderModal";
import { DeleteOrderModal } from "./DeleteOrderModal";

type OrderActionsProps = {
  order: z.infer<typeof OrderSchema>;
};

export const OrderActions = ({ order }: OrderActionsProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <EntityActions
      label="order"
      viewModal={
        <ViewOrderModal
          order={order}
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
        />
      }
      deleteModal={
        <DeleteOrderModal
          order={order}
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
        />
      }
    />
  );
};
