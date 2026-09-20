"use client"

import FormField from "@/app/components/ui/forms/form-field/form-field"
import Input from "@/app/components/ui/forms/input/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "../schemas/login.schema"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(formData: LoginFormData) {
    console.log("submitted: ", formData)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    > 
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
        className="
          w-full cursor-pointer rounded-lg
          bg-slate-950 px-4 py-2.5
          text-sm font-medium text-white
          transition
          hover:bg-slate-800
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
          focus:ring-offset-2
        "
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginForm
