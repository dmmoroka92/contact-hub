import { db } from "@/db";
import { companies } from "@/db/companies.schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getCompanies() {
  const session = await auth.api.getSession({
    headers:  await headers()
  })

  if (!session) return []

  return db
    .select()
    .from(companies)
    .where(eq(companies.userId, session.user.id))
    .orderBy(companies.name)
}