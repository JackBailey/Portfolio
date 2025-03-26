import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const getDB = () => {
    const client = postgres(process.env.POSTGRES_URL, { prepare: false });
    return drizzle(client);
};
