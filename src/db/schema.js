import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const submissionsTable = sqliteTable("submissions", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    message: text().notNull(),
    createdAt: text().notNull(),
    ipAddress: text().notNull(),
    userAgent: text().notNull()
});