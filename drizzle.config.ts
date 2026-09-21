import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
  schema: "./src/db/db.schema.ts",
  out: "./drizzle",
  dialect: "mysql",

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

