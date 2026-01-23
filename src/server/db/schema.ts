import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // We will generate UUIDs in application logic or use a specific function if preferred
  address: text("address").notNull().unique(),
  name: text("name"),
  surname: text("surname"),
  age: int("age"),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});
