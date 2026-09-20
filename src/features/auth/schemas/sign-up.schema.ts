import { z } from "zod"

export const signUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name should be at least 2 characters")
    .max(25, "First name should be at least 25 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name should be at least 2 characters")
    .max(25, "Last name should be at least 25 characters"),

  email: z
    .email({
      pattern: z.regexes.html5Email,
      error: "Enter a valid email address"
    }),
  
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .regex(/[A-Z]/, "Password should contain at least one uppercase letter")
    .regex(/[0-9]/, "Password should contain at least one digit")
    .regex(/[^A-Za-z0-9\s]/, "Password should contain at least one special character"),

  passwordConfirmation: z
    .string()
    .min(1, "Password confirmation is required")
}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }
)

export type SignUpFormData = z.infer<typeof signUpSchema>
