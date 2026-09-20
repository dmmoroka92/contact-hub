import SignUpForm from "@/features/auth/components/sign-up-form";

function SignUpPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Get started with ContactHub.
        </p>
      </div>

      <SignUpForm />
    </div>
  );
}

export default SignUpPage;