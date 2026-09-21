import { contacts } from "@/db/contacts.schema";

export type Contact = typeof contacts.$inferSelect
