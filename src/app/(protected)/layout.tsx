import { ROUTES } from "@/constants/routes"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import Sidebar from "./components/sidebar"
import TopBar from "./components/top-bar"

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


      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={session.user} />

        <main className="flex-1 px-8 py-7">
          {children}
        </main>
      </div>

      <div id="modal-root"></div>
    </div>
  )
}

export default ProtectedLayout
