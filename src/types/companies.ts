import { companies } from "@/db/companies.schema";

export type Company = typeof companies.$inferSelect;

export type CompanyWithContacts = Pick<
  Company,
  "id" | "name" | "website" | "industry" | "createdAt"
> & {
  contactsCount: number;
};