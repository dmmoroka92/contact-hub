import { ROUTES } from "@/constants/routes"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

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
    <>
      {children}
    </>
  )
}

export default ProtectedLayout