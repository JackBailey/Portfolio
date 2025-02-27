import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/db/migrations",
    schema: "./src/db/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL
    }
});