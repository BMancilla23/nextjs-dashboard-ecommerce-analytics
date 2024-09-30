"use client";

import { CustomersSchema } from "@/types/customer-schema";
import React, { useState } from "react";
import { z } from "zod";
import { EntityActions } from "../ui/entity-actions";
import DeleteCustomerModal from "./DeleteCustomerModal";

type CustomerActionsProps = {
  customer: z.infer<typeof CustomersSchema>;
};

export const CustomerActions = ({ customer }: CustomerActionsProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <EntityActions
      label="customer"
      deleteModal={
        <DeleteCustomerModal
          customer={customer}
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
        />
      }
    />
  );
};
