"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormField from "@/app/components/ui/forms/form-field/form-field";
import Input from "@/app/components/ui/input";

import {
  CompanyFormData,
  companySchema,
} from "@/features/companies/queries/schemas/companies.schema";
import { createCompany } from "@/features/companies/actions/create-company";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CompanyWithContacts } from "@/types/companies";
import { updateCompany } from "@/features/companies/actions/update-company";

type CompanyFormProps = {
  company?: CompanyWithContacts,
  onSuccess?: () => void
};

function CompanyForm({
  onSuccess,
  company
}: CompanyFormProps) {
  const router = useRouter();

  const isEditing = !!company

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name ?? "",
      website: company?.website ?? "",
      industry: company?.industry ?? "",
    },
  });

  async function onSubmit(
    formData: CompanyFormData,
  ) {
    try {
      if (company) {
        await updateCompany(
          company.id,
          formData,
        );

        toast.success(
          "Company updated successfully.",
        );
      } else {
        await createCompany(formData);

        toast.success(
          "Company created successfully.",
        );
      }

      onSuccess?.();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : isEditing
            ? "Failed to update company"
            : "Failed to create company",
      );
    }
  }

  return (
    <form
      id="company-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        id="name"
        label="Company name"
        error={errors.name?.message}
      >
        <Input
          id="name"
          type="text"
          placeholder="Enter company name"
          {...register("name")}
        />
      </FormField>

      <FormField
        id="website"
        label="Website"
        error={errors.website?.message}
      >
        <Input
          id="website"
          type="url"
          placeholder="https://example.com"
          {...register("website")}
        />
      </FormField>

      <FormField
        id="industry"
        label="Industry"
        error={errors.industry?.message}
      >
        <Input
          id="industry"
          type="text"
          placeholder="e.g. Software, Finance, Healthcare"
          {...register("industry")}
        />
      </FormField>
    </form>
  );
}

export default CompanyForm
