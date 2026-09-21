import { ROUTES } from "@/constants/routes"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import Sidebar from "./components/sidebar"

type ProtectedLayoutProps = {
  children: ReactNode
}

async function ProtectedLayout({
  children
}: ProtectedLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect(ROUTES.AUTH.LOGIN)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <div className="min-h-screen px-8 py-7">
          {children}
        </div>
      </main>
    </div>
  )
}

export default ProtectedLayout