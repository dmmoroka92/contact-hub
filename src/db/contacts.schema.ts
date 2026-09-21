import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

import { user } from "./auth.schema";
import { companies } from "./companies.schema";

export const contacts = table(
  "contacts",
  {
    id: t.int().autoincrement().primaryKey(),

    userId: t
      .varchar({ length: 36 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    companyId: t
      .int()
      .references(() => companies.id, {
        onDelete: "set null",
      }),

    firstName: t
      .varchar({ length: 50 })
      .notNull(),

    lastName: t
      .varchar({ length: 50 })
      .notNull(),

    position: t.varchar({ length: 150 }),

    contactType: t.varchar({ length: 50 }),

    lastContactedAt: t.timestamp(),

    createdAt: t
      .timestamp()
      .defaultNow()
      .notNull(),

    updatedAt: t
      .timestamp()
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (table) => [
    t.index("contacts_user_id_idx").on(table.userId),
    t.index("contacts_company_id_idx").on(table.companyId),
  ],
);