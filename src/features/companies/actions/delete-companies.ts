"use server";

import { db } from "@/db";
import { companies } from "@/db/companies.schema";
import { auth } from "@/lib/auth";
import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";

export async function deleteCompanies(
  companyIds: number[],
) {
  if (companyIds.length === 0) {
    return;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(companies)
    .where(
      and(
        eq(companies.userId, session.user.id),
        inArray(companies.id, companyIds),
      ),
    );
}