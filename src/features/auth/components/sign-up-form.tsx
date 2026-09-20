"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import FormField from "@/app/components/ui/forms/form-field/form-field";
import Input from "@/app/components/ui/forms/input/input";
import {
  type SignUpFormData,
  signUpSchema,
} from "../schemas/sign-up.schema";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(formData: SignUpFormData) {
    console.log("submitted:", formData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* First name / Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="firstName"
          label="First name"
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
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
            placeholder="Smith"
            autoComplete="family-name"
            {...register("lastName")}
          />
        </FormField>
      </div>

      {/* Email */}
      <FormField
        id="email"
        label="Email"
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register("email")}
        />
      </FormField>

      {/* Password */}
      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          {...register("password")}
        />
      </FormField>

      {/* Password confirmation */}
      <FormField
        id="passwordConfirmation"
        label="Confirm password"
        error={errors.passwordConfirmation?.message}
      >
        <Input
          id="passwordConfirmation"
          type="password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          {...register("passwordConfirmation")}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full cursor-pointer rounded-lg
          bg-slate-950 px-4 py-2.5
          text-sm font-medium text-white
          transition
          hover:bg-slate-800
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
          focus:ring-offset-2
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-slate-950 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;