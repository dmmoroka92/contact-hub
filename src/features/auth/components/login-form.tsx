"use client"

import FormField from "@/app/components/ui/forms/form-field/form-field"
import Input from "@/app/components/ui/forms/input/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "../schemas/login.schema"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"

function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(formData: LoginFormData) {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      setError("root", {
        message: "Invalid email or password"
      })

      return
    }

    router.push(ROUTES.CONTACTS)
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {errors.root?.message && (
        <div
          role="alert"
          className="
            rounded-lg border border-red-200
            bg-red-50 px-4 py-3
            text-sm text-red-700
          "
        >
          {errors.root.message}
        </div>
      )}
  
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
  
      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
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
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}

export default LoginForm
