"use server"

import { db } from "@/db";
import {
  CompanyFormData,
  companySchema
} from "../queries/schemas/companies.schema";
import { companies } from "@/db/companies.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

export async function updateCompany(
  companyId: number,
  formData: CompanyFormData,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = companySchema.parse(formData);

  await db
    .update(companies)
    .set({
      name: data.name,
      website: data.website,
      industry: data.industry,
    })
    .where(
      and(
        eq(companies.id, companyId),
        eq(companies.userId, session.user.id),
      ),
    );
}