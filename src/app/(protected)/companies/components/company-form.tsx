"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormField from "@/app/components/ui/forms/form-field/form-field";
import Input from "@/app/components/ui/input";

import {
  CompanyFormData,
  companySchema,
} from "@/features/companies/queries/schemas/companies.schema";
import { useEffect } from "react";
import { createCompany } from "@/features/companies/actions/create-company";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CompanyFormProps = {
  onSuccess?: () => void
  onSubmittingChange?: (isSubmitting: boolean) => void;
};

function CompanyForm({
  onSuccess,
  onSubmittingChange
}: CompanyFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      website: "",
      industry: "",
    },
  });

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  async function onSubmit(formData: CompanyFormData) {
    try {
      await createCompany(formData)

      toast.success("Company was created")

      router.refresh()

      onSuccess?.()
    } catch(error: unknown) {
      console.error("Company creation failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create company"
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

export default CompanyForm;