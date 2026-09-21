"use client";

import Modal from "@/app/components/ui/modal/modal";
import { companies } from "@/db/companies.schema";
import ContactForm from "@/features/contacts/components/contact-form";
import { cn } from "@/lib/utils";
import { Company } from "@/types/companies";
import { Plus } from "lucide-react";
import { useState } from "react";

type ContactsHeaderProps = {
  companies: Company[]
}

export default function ContactsHeader({
  companies
}: ContactsHeaderProps) {
  const [isAddContactOpen, setIsAddContactOpen] = useState<boolean>(false)
  const [isCreatingContact, setIsCreatingContact] = useState(false);

  function closeModal() {
    setIsAddContactOpen(false)
  }

  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Contacts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your contacts and keep your network organized.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsAddContactOpen(true)}
        className="
          inline-flex cursor-pointer items-center justify-center gap-2
          rounded-lg bg-blue-600
          px-4 py-2.5
          text-sm font-medium text-white
          shadow-sm
          transition
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:ring-offset-2
        "
      >
        <Plus className="size-5" />
        Add Contact
      </button>

      <Modal
        open={isAddContactOpen}
        title="New contact"
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              disabled={isCreatingContact}
              className={cn(
                "cursor-pointer rounded-lg",
                "border border-slate-300",
                "bg-white px-4 py-2",
                "text-sm font-medium text-slate-700",
                "transition",
                "hover:bg-slate-50",
                "focus:outline-none",
                "focus:ring-2 focus:ring-slate-300",
                "focus:ring-offset-2"
              )}
            >
              Cancel
            </button>

            <button
              type="submit"
              form="contact-form"
              className={cn(
                "cursor-pointer rounded-lg",
                "bg-blue-600 px-4 py-2",
                "text-sm font-medium text-white",
                "transition",
                "hover:bg-blue-700",
                "focus:outline-none",
                "focus:ring-2 focus:ring-blue-500",
                "focus:ring-offset-2"
              )}
            >
              { isCreatingContact ? "Creating..." : "Add contact" }
            </button>
          </>
        }
        onClose={closeModal}
      >
        <ContactForm
          companies={companies}
          onSuccess={closeModal}
          onSubmittingChange={setIsCreatingContact}
        />
      </Modal>
    </div>
  );
}
