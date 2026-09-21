"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormField from "@/app/components/ui/forms/form-field/form-field";

import { CONTACT_TYPES } from "@/constants/contact-types";

import Input from "@/app/components/ui/input";
import Select from "@/app/components/ui/select";
import { Company } from "@/types/companies";

import { toast } from "sonner";
import { createContact } from "../actions/create-contact";

import {
  ContactFormData,
  contactSchema,
} from "../schemas/contacts.schema";
import { useEffect } from "react";

type ContactFormProps = {
  companies: Company[]
  onSuccess?: () => void
  onSubmittingChange?: (isSubmitting: boolean) => void;
};

function ContactForm({
  companies,
  onSuccess,
  onSubmittingChange
}: ContactFormProps) {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      companyId: null,
      position: "",
      contactType: undefined,
    },
  });

  const contactType = watch("contactType")

  async function onSubmit(formData: ContactFormData) {
    try {
      await createContact(formData)

      reset()
      
      toast.success("Contact was created")

      onSuccess?.()
    } catch(error: unknown) {
      console.error("Contact creation failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create contact"
      );
    }
  }

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        id="firstName"
        label="First name"
        error={errors.firstName?.message}
      >
        <Input
          id="firstName"
          type="text"
          placeholder="Enter first name"
          {...register("firstName")}
        />
      </FormField>

      <FormField
        id="lastName"
        label="Last name"
        error={errors.lastName?.message}
      >
        <Input
          id="lastName"
          type="text"
          placeholder="Enter last name"
          {...register("lastName")}
        />
      </FormField>

      <FormField
        id="contactType"
        label="Contact type"
        error={errors.contactType?.message}
      >
        <Select
          id="contactType"
          {...register("contactType")}
        >
          <option value="">Select contact type</option>

          {CONTACT_TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </Select>
      </FormField>

      {contactType && contactType !== "personal" && (
        <>
          <FormField
            id="companyId"
            label="Company"
            error={errors.companyId?.message}
          >
            <Select
              id="companyId"
              {...register("companyId", {
                setValueAs: (value) =>
                  [null, ""].includes(value)
                    ? null
                    : Number(value),
              })}
            >
              <option value="">No company</option>
    
              {companies.map((company) => (
                <option
                  key={company.id}
                  value={company.id}
                >
                  {company.name}
                </option>
              ))}
            </Select>
          </FormField>
    
          <FormField
            id="position"
            label="Position"
            error={errors.position?.message}
          >
            <Input
              id="position"
              type="text"
              placeholder="Enter position"
              {...register("position")}
            />
          </FormField>
        </>
      )}
    </form>
  );
}

export default ContactForm;
