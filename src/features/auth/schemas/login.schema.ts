import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({
    pattern: z.regexes.html5Email,
    error: "Enter a valid email address"
  }),

  password: z
    .string()
    .min(1, "Password is required")
})

export type LoginFormData = z.infer<typeof loginSchema>