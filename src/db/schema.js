import { serial, text, date, pgTable } from "drizzle-orm/pg-core";

export const submissionsTable = pgTable("submissions", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    message: text().notNull(),
    createdAt: date().notNull(),
    ipAddress: text().notNull(),
    userAgent: text().notNull()
});