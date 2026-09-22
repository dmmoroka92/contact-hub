"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Modal from "@/app/components/ui/modal/modal";
import { cn } from "@/lib/utils";
import CompanyForm from "./company-form";

export default function CompaniesHeader() {
  const [isAddCompanyOpen, setIsAddCompanyOpen] =
    useState<boolean>(false);
  const [isAddingCompany, setIsAddingCompany] = useState<boolean>(false)  

  function closeModal() {
    setIsAddCompanyOpen(false);
  }

  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Companies
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage companies and organize your professional network.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsAddCompanyOpen(true)}
        disabled={isAddingCompany}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2",
          "rounded-lg bg-blue-600",
          "px-4 py-2.5",
          "text-sm font-medium text-white",
          "shadow-sm transition",
          "hover:bg-blue-700",
          "focus:outline-none",
          "focus:ring-2 focus:ring-blue-500",
          "focus:ring-offset-2",
        )}
      >
        <Plus className="size-5" />
        Add Company
      </button>

      <Modal
        open={isAddCompanyOpen}
        title="New company"
        onClose={closeModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className={cn(
                "cursor-pointer rounded-lg",
                "border border-slate-300",
                "bg-white px-4 py-2",
                "text-sm font-medium text-slate-700",
                "transition",
                "hover:bg-slate-50",
                "focus:outline-none",
                "focus:ring-2 focus:ring-slate-300",
                "focus:ring-offset-2",
              )}
            >
              Cancel
            </button>

            <button
              type="submit"
              form="company-form"
              className={cn(
                "cursor-pointer rounded-lg",
                "bg-blue-600 px-4 py-2",
                "text-sm font-medium text-white",
                "transition",
                "hover:bg-blue-700",
                "focus:outline-none",
                "focus:ring-2 focus:ring-blue-500",
                "focus:ring-offset-2",
              )}
            >
              {isAddingCompany ? "Creating..." : "Add company"}
            </button>
          </>
        }
      >
        <CompanyForm
          onSuccess={closeModal}
          onSubmittingChange={setIsAddingCompany}  
        />
      </Modal>
    </div>
  );
}