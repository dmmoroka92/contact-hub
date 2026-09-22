"use client";

import { AlertTriangle } from "lucide-react";

import Modal from "./modal";
import { cn } from "@/lib/utils";

type DangerModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loadingLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

function DangerModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loadingLabel = "Deleting...",
  isLoading = false,
  onConfirm,
  onClose,
}: DangerModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className={cn(
              "cursor-pointer rounded-lg border border-slate-300",
              "bg-white px-4 py-2",
              "text-sm font-medium text-slate-700",
              "transition hover:bg-slate-50",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={cn(
              "cursor-pointer rounded-lg",
              "bg-red-600 px-4 py-2",
              "text-sm font-medium text-white",
              "transition hover:bg-red-700",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center",
            "rounded-full bg-red-50",
          )}
        >
          <AlertTriangle className="size-5 text-red-600" />
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </Modal>
  );
}

export default DangerModal;
