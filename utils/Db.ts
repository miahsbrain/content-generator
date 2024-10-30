import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const apiKey = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!
if (!apiKey) {
    throw new Error('NEXT_PUBLIC_DRIZZLE_DATABASE_URL key is not defined')
}
const sql = neon(apiKey);
export const db = drizzle({ client: sql });