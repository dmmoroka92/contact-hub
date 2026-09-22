import { z } from "zod"

export const companySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150, "Name should be at most 150 characters"),

  website: z
    .string()
    .min(1, "Website is required")
    .max(255, "Website should be at most 255 characters"),

  industry: z
    .string()
    .min(1, "Industry is required")
    .max(100, "Industry should be at most 100 characters")
})

export type CompanyFormData = z.infer<typeof companySchema>
