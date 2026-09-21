import { drizzle } from "drizzle-orm/mysql2";

import * as authSchema from "./auth.schema";
import * as contactsSchema from "./contacts.schema"
import * as tagsSchema from "./tags.schema"
import * as companiesSchema from "./companies.schema"
import * as contactTagsSchema  from "./contact-tags.schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const schema = {
  ...authSchema,
  ...contactsSchema,
  ...contactTagsSchema,
  ...companiesSchema,
  ...tagsSchema
}

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
  mode: "default",
});