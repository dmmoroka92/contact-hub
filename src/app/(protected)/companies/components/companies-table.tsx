"use client";

import { useState } from "react";

import {
  ExternalLink,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { toast } from "sonner";

import DataTable, {
  type DataTableColumn,
} from "@/app/components/ui/data-table/data-table";

import type { BulkAction } from "@/app/components/ui/data-table/bulk-actions";
import type { RowAction } from "@/app/components/ui/data-table/row-actions";
import type { Pagination } from "@/app/components/ui/data-table/table-pagination";

import ConfirmationModal from "@/app/components/ui/modal/confirmation-modal";

import { deleteCompanies } from "@/features/companies/actions/delete-companies";

import { cn, formatDate } from "@/lib/utils";

import Modal from "@/app/components/ui/modal/modal";
import type { CompanyWithContacts } from "@/types/companies";
import CompanyForm from "./company-form";

type CompaniesTableProps = {
  companies: CompanyWithContacts[];
  pagination: Pagination;
};

type ConfirmationAction = {
  itemIds: number[];
  title: string;
  description: string;
  confirmLabel: string;
  handler: (itemIds: number[]) => Promise<void>;
};

function CompaniesTable({
  companies,
  pagination,
}: CompaniesTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction | null>(null);
  const [companyToEdit, setCompanyToEdit] =
    useState<CompanyWithContacts | null>(null);  

  const [isProcessing, setIsProcessing] =
    useState(false);

  const columns: DataTableColumn<CompanyWithContacts>[] = [
    {
      key: "name",
      header: "Name",
      render: (company) => (
        <span className="font-medium text-slate-950">
          {company.name}
        </span>
      ),
    },
    {
      key: "website",
      header: "Website",
      render: (company) =>
        company.website ? (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5",
              "text-blue-600 hover:text-blue-700",
            )}
          >
            {company.website}

            <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <span className="text-slate-400">
            —
          </span>
        ),
    },
    {
      key: "contacts",
      header: "Contacts",
      render: (company) =>
        company.contactsCount,
    },
    {
      key: "industry",
      header: "Industry",
      render: (company) =>
        company.industry || (
          <span className="text-slate-400">
            —
          </span>
        ),
    },
    {
      key: "createdAt",
      header: "Created",
      className: "whitespace-nowrap",
      render: (company) => (
        <span className="text-slate-500">
          {formatDate(company.createdAt)}
        </span>
      ),
    },
  ];

  async function handleDeleteCompanies(
    companyIds: number[],
  ) {
    await deleteCompanies(companyIds);

    router.refresh();

    toast.success(
      companyIds.length === 1
        ? "Company deleted successfully."
        : "Companies deleted successfully.",
    );
  }

  function requestDelete(
    companyIds: number[],
  ) {
    const count = companyIds.length;

    setConfirmationAction({
      itemIds: companyIds,

      title:
        count === 1
          ? "Delete company?"
          : "Delete companies?",

      description:
        count === 1
          ? "Are you sure you want to delete this company? This action cannot be undone."
          : `Are you sure you want to delete ${count} companies? This action cannot be undone.`,

      confirmLabel:
        count === 1
          ? "Delete company"
          : "Delete companies",

      handler: handleDeleteCompanies,
    });
  }

  async function handleConfirmAction() {
    if (!confirmationAction) return;

    try {
      setIsProcessing(true);

      await confirmationAction.handler(
        confirmationAction.itemIds,
      );

      setConfirmationAction(null);
    } catch (error: unknown) {
      console.error(
        "Company action failed:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Company action failed",
      );
    } finally {
      setIsProcessing(false);
    }
  }

  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: Eye,
      handler: (companyIds) => {
        const [companyId] = companyIds;

        router.push(
          `/companies/${companyId}`,
        );
      },
    },
    {
      label: "Edit",
      icon: Pencil,
      handler: (companyIds) => {
        const [companyId] = companyIds;

        const company = companies.find(
          (company) => company.id === companyId,
        );

        if (!company) return;

        setCompanyToEdit(company);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      isDestructive: true,
      handler: requestDelete,
    },
  ];

  const bulkActions: BulkAction[] = [
    {
      label: "Delete",
      icon: Trash2,
      isDestructive: true,
      handler: requestDelete,
    },
  ];

  function handlePageChange(page: number) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("page", String(page));

    router.push(
      `${pathname}?${params.toString()}`,
    );
  }

  function handlePerPageChange(
    perPage: number,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("page", "1");
    params.set(
      "perPage",
      String(perPage),
    );

    router.push(
      `${pathname}?${params.toString()}`,
    );
  }

  return (
    <>
      <DataTable
        data={companies}
        columns={columns}
        pagination={pagination}
        bulkActions={bulkActions}
        rowActions={rowActions}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />

      <ConfirmationModal
        open={confirmationAction !== null}
        title={
          confirmationAction?.title ?? ""
        }
        description={
          confirmationAction?.description ?? ""
        }
        confirmLabel={
          confirmationAction?.confirmLabel ??
          "Confirm"
        }
        isLoading={isProcessing}
        onClose={() =>
          setConfirmationAction(null)
        }
        onConfirm={handleConfirmAction}
      />

    {companyToEdit && (
      <Modal
        open={companyToEdit !== null}
        title="Edit company"
        onClose={() => setCompanyToEdit(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setCompanyToEdit(null)}
              className={cn(
                "cursor-pointer rounded-lg",
                "border border-slate-300",
                "bg-white px-4 py-2",
                "text-sm font-medium text-slate-700",
                "hover:bg-slate-50",
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
                "hover:bg-blue-700",
              )}
            >
              Save changes
            </button>
          </>
        }
      >
        <CompanyForm
          company={companyToEdit}
          onSuccess={() => {
            setCompanyToEdit(null);
            router.refresh();
          }}
        />
      </Modal>
    )}
    </>
  );
}

export default CompaniesTable;
