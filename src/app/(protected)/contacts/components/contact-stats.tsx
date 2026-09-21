import { headers } from "next/headers";

import { companies } from "@/db/companies.schema";
import { contacts } from "@/db/contacts.schema";
import { tags } from "@/db/tags.schema";
import { auth } from "@/lib/auth";

import { getTableStats } from "@/features/contacts/queries/get-table-stats.query";
import StatCard from "./stat-card";

async function ContactStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const [
    contactsStats,
    companiesStats,
    tagsStats,
  ] = await Promise.all([
    getTableStats({
      table: contacts,
      userIdColumn: contacts.userId,
      createdAtColumn: contacts.createdAt,
      userId,
    }),

    getTableStats({
      table: companies,
      userIdColumn: companies.userId,
      createdAtColumn: companies.createdAt,
      userId,
    }),

    getTableStats({
      table: tags,
      userIdColumn: tags.userId,
      createdAtColumn: tags.createdAt,
      userId,
    }),
  ]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        type="contacts"
        value={contactsStats.total}
        change={contactsStats.monthChange}
      />

      <StatCard
        type="companies"
        value={companiesStats.total}
        change={companiesStats.monthChange}
      />

      <StatCard
        type="tags"
        value={tagsStats.total}
        change={tagsStats.monthChange}
      />

      <StatCard
        type="favorites"
        value={0}
        change={0}
      />
    </div>
  );
}

export default ContactStats;