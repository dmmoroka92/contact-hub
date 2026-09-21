import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

import { contacts } from "./contacts.schema";
import { tags } from "./tags.schema";

export const contactTags = table(
  "contact_tags",
  {
    contactId: t
      .int()
      .notNull()
      .references(() => contacts.id, {
        onDelete: "cascade",
      }),

    tagId: t
      .int()
      .notNull()
      .references(() => tags.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    t.primaryKey({
      columns: [
        table.contactId,
        table.tagId,
      ],
    }),
  ],
);
