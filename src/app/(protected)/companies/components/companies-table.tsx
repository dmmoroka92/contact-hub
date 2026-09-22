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

import DataTable, {
  type DataTableColumn,
} from "@/app/components/ui/data-table/data-table";

import type { BulkAction } from "@/app/components/ui/data-table/bulk-actions";
import type { RowAction } from "@/app/components/ui/data-table/row-actions";
import type { Pagination } from "@/app/components/ui/data-table/table-pagination";

import ConfirmationModal from "@/app/components/ui/modal/confirmation-modal";

import { deleteCompanies } from "@/features/companies/actions/delete-companies";
import { cn, formatDate } from "@/lib/utils";
import type { CompanyWithContacts } from "@/types/companies";
import { toast } from "sonner";

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
              "text-blue-600 hover:text-blue-700"
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
      render: (company) => company.contactsCount,
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
    try {
      await deleteCompanies(companyIds)

      router.refresh()

      toast.success("Companies deleted successfully.")
    } catch(error: unknown) {
      console.error("Companies deletion failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete companies"
      );
    }
  }

  function requestDelete(companyIds: number[]) {
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

      router.refresh();
    } catch (error) {
      console.error(
        "Company action failed:",
        error,
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

        router.push(
          `/companies/${companyId}/edit`,
        );
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
        title={confirmationAction?.title ?? ""}
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
    </>
  );
}

export default CompaniesTable;
