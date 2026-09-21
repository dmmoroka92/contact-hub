import { companies } from "@/db/companies.schema";

export type Company = typeof companies.$inferSelect;