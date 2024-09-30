"use client";

import { MoreHorizontal } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type EntityActionsProps = {
  label: string;
  viewModal?: ReactElement<ModalProps> | null;
  editModal?: ReactElement<ModalProps> | null;
  deleteModal?: ReactElement<ModalProps> | null;
};

export const EntityActions = ({
  label,
  viewModal = null,
  editModal = null,
  deleteModal = null,
}: EntityActionsProps) => {
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
          {viewModal && (
            <DropdownMenuItem
              onSelect={() => viewModal.props.onOpenChange(true)}
            >
              View {label}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {editModal && (
            <DropdownMenuItem
              onSelect={() => editModal.props.onOpenChange(true)}
            >
              Edit {label}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {deleteModal && (
            <DropdownMenuItem
              onSelect={() => deleteModal.props.onOpenChange(true)}
            >
              Delete {label}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Renderización condicional de modales */}
      {viewModal &&
        cloneElement(viewModal, {
          open: viewModal.props.open,
          onOpenChange: viewModal.props.onOpenChange,
        })}
      {editModal &&
        cloneElement(editModal, {
          open: editModal.props.open,
          onOpenChange: editModal.props.onOpenChange,
        })}
      {deleteModal &&
        cloneElement(deleteModal, {
          open: deleteModal.props.open,
          onOpenChange: deleteModal.props.onOpenChange,
        })}
    </>
  );
};
