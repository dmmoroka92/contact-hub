import { CONTACT_TYPES } from "@/constants/contact-types";
import { z } from "zod";

export const contactSchema = z.object({
  companyId: z
    .number()
    .int()
    .positive()
    .nullable(),

  firstName: z
    .string()
    .trim()
    .min(2, "First name should be at least 2 characters")
    .max(50, "First name should be at most 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name should be at least 2 characters")
    .max(50, "Last name should be at most 50 characters"),

  position: z
    .string()
    .trim()
    .max(150, "Position should be at most 150 characters")
    .optional(),

  contactType: z.enum(CONTACT_TYPES, "Contact type should be of allowed type"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
