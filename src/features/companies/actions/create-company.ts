"use server"

import { headers } from "next/headers";
import { CompanyFormData, companySchema } from "../queries/schemas/companies.schema";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { companies } from "@/db/companies.schema";

export async function createCompany(formData: CompanyFormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const data = companySchema.parse(formData)

  await db.insert(companies).values({
    userId: session.user.id,
    name: data.name,
    website: data.website,
    industry: data.industry
  })
}