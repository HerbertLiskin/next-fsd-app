import { type Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
  tablesFilter: ["next-fsd-app_*"],
}) satisfies Config;
