import { ROUTES } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { ContactRound } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect(ROUTES.CONTACTS)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <ContactRound size={21} />
          </div>

          <span className="text-xl font-semibold tracking-tight text-slate-950">
            ContactHub
          </span>
        </div>

        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
