import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

import { user } from "./auth.schema";

export const tags = table(
  "tags",
  {
    id: t.int().autoincrement().primaryKey(),

    userId: t
      .varchar({ length: 36 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    name: t
      .varchar({ length: 50 })
      .notNull(),

    createdAt: t
      .timestamp()
      .defaultNow()
      .notNull(),
  },
  (table) => [
    t
      .uniqueIndex("tags_user_id_name_idx")
      .on(table.userId, table.name),
  ],
);
