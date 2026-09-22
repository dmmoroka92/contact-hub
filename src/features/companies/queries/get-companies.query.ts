import { db } from "@/db";
import { companies } from "@/db/companies.schema";
import { auth } from "@/lib/auth";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { contacts } from "@/db/contacts.schema";
import { Pagination } from "@/app/components/ui/data-table/table-pagination";

type GetCompaniesParams = {
  page: number;
  perPage: number;
};

export async function getCompanies({
  page,
  perPage,
}: GetCompaniesParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const pagination: Pagination = {
      currentPage: 1,
      perPage,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    return {
      data: [],
      pagination,
    };
  }

  const offset = (page - 1) * perPage;

  const [data, [totalResult]] = await Promise.all([
    db
      .select({
        id: companies.id,
        name: companies.name,
        website: companies.website,
        industry: companies.industry,
        createdAt: companies.createdAt,
        contactsCount: count(contacts.id)
      })
      .from(companies)
      .leftJoin(
        contacts,
        eq(contacts.companyId, companies.id)
      )
      .where(
        eq(companies.userId, session.user.id),
      )
      .groupBy(companies.id)
      .orderBy(companies.name)
      .limit(perPage)
      .offset(offset),

    db
      .select({
        total: count(),
      })
      .from(companies)
      .where(
        eq(companies.userId, session.user.id),
      ),
  ]);

  const totalItems = totalResult.total;

  const totalPages = Math.ceil(
    totalItems / perPage,
  );

  const pagination: Pagination = {
    currentPage: page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    data,
    pagination,
  };
}
