"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import TablePagination from "./table-pagination";
import ContactTypeBadge from "./contact-type-badge";
import RowActions from "./row-actions";
import { cn } from "@/lib/utils";
import BulkActions from "@/app/components/ui/data-table/bulk-actions";

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  position: string | null;
  company: {
    id: number;
    name: string;
  } | null;
  contactType: "work" | "client" | "recruiter" | "personal";
  tags: {
    id: number;
    name: string;
  }[];
  lastContactedAt: string | null;
};

const contacts: Contact[] = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Mitchell",
    position: "Product Designer",
    company: {
      id: 1,
      name: "Acme Labs",
    },
    contactType: "work",
    tags: [
      { id: 1, name: "Developer" },
      { id: 2, name: "Remote" },
      { id: 3, name: "Important" },
      { id: 4, name: "Design" },
      { id: 5, name: "Customer" },
    ],
    lastContactedAt: "Sep 18, 2026",
  },
];

export default function ContactsTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [perPage, setPerPage] = useState(10);

  const allSelected =
    contacts.length > 0 &&
    contacts.every((contact) => selectedIds.includes(contact.id));

  function toggleContact(id: number) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(contacts.map((contact) => contact.id));
  }

  return (
    <div className="space-y-3">
      {selectedIds.length > 0 && (
        <BulkActions
          selectedCount={selectedIds.length}
          onClear={() => setSelectedIds([])}
        />
      )}

      <div className="overflow-visible rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50/60">
              <tr className="text-xs font-medium text-slate-500">
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="size-4 cursor-pointer rounded border-slate-300"
                    aria-label="Select all contacts"
                  />
                </th>

                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Last contacted</th>

                <th className="w-14 px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {contacts.map((contact) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  selected={selectedIds.includes(contact.id)}
                  onSelect={() => toggleContact(contact.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        page={1}
        perPage={perPage}
        total={124}
        onPerPageChange={setPerPage}
      />
    </div>
  );
}

type ContactRowProps = {
  contact: Contact;
  selected: boolean;
  onSelect: () => void;
};

function ContactRow({
  contact,
  selected,
  onSelect,
}: ContactRowProps) {
  const visibleTags = contact.tags.slice(0, 2);
  const remainingTags = contact.tags.length - visibleTags.length;

  return (
    <tr className="text-sm text-slate-700 transition hover:bg-slate-50/70">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="size-4 cursor-pointer rounded border-slate-300"
          aria-label={`Select ${contact.firstName} ${contact.lastName}`}
        />
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex size-9 shrink-0 items-center justify-center",
            "rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
          )}>
            {contact.firstName.charAt(0)}
            {contact.lastName.charAt(0)}
          </div>

          <div>
            <p className="font-medium text-slate-950">
              {contact.firstName} {contact.lastName}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        {contact.company ? (
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-slate-100">
              <Building2 className="size-4 text-slate-500" />
            </div>

            <span>{contact.company.name}</span>
          </div>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        {contact.position ?? (
          <span className="text-slate-400">—</span>
        )}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag.id}
              className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600"
            >
              {tag.name}
            </span>
          ))}

          {remainingTags > 0 && (
            <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
              +{remainingTags}
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3">
        <ContactTypeBadge type={contact.contactType} />
      </td>

      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
        {contact.lastContactedAt ?? "Never"}
      </td>

      <td className="relative px-4 py-3">
        <RowActions
          contactId={contact.id}
          actions={[
            {
              label: "View",
              handler: (contactId) => {
                console.log("View", contactId);
              },
            },
            {
              label: "Edit",
              handler: (contactId) => {
                console.log("Edit", contactId);
              },
            },
            {
              label: "Delete",
              handler: (contactId) => {
                console.log("Delete", contactId);
              },
            },
          ]}
        />
      </td>
    </tr>
  );
}
