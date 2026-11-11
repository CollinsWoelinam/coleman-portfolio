// Drizzle configuration for Neon Serverless PostgreSQL
export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql" as const,
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
};
