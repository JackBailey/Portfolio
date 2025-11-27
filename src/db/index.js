import 'dotenv/config';
import { drizzle } from 'drizzle-orm/d1';

export const getDB = (env) => {
    const client = drizzle(env.DB);
    return client;
};
