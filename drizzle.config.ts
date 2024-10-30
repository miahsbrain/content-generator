import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// Load `.env.local` explicitly [NEEDED]
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// Get apikey
const apiKey = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
// Throw error if apikey is not set
if (!apiKey) {
    throw new Error('NEXT_PUBLIC_DRIZZLE_DATABASE_URL is not defined')
}

export default defineConfig({
    out: './drizzle',
    schema: './utils/Schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: apiKey,
    },
});