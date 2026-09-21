import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

import { user } from "./auth.schema";

export const companies = table(
  "companies",
  {
    id: t.int().autoincrement().primaryKey(),

    userId: t
      .varchar({ length: 36 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    name: t.varchar({ length: 150 }).notNull(),

    website: t.varchar({ length: 255 }),

    industry: t.varchar({ length: 100 }),

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
    t.uniqueIndex("companies_user_id_name_idx").on(
      table.userId,
      table.name,
    ),
  ],
);