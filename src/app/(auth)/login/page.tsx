import LoginForm from "@/features/auth/components/login-form";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to your account to continue.
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Sign up */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-slate-950 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
