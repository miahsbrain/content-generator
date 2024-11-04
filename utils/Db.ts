import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { aiOutputModel, subscriptionModel } from './Schema';
import moment from 'moment';
import { eq } from 'drizzle-orm';

const apiKey = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!
if (!apiKey) {
    throw new Error('NEXT_PUBLIC_DRIZZLE_DATABASE_URL key is not defined')
}
const sql = neon(apiKey);
export const db = drizzle({ client: sql });

// Add new subscription to database
export async function createSubscription( email: string, plan: 'free' | 'plus', paypalSubscriptionId: string ) {
    const startDate = moment().format('DD/MM/YYYY');
    const endDate = moment().add(1, 'month').format('DD/MM/YYYY');

    try {
        await db.insert(subscriptionModel).values({ email, plan, startDate, endDate, paypalSubscriptionId, createdAt: moment().format('DD/MM/YYYY'), updatedAt: moment().format('DD/MM/YYYY') });
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }

}

// Get the current user subscription
export async function getCurrentSubscription(email: string) {
    try {
        const subscriptions = await db.select().from(subscriptionModel)
        .where(eq(subscriptionModel.email, email))
        .orderBy(subscriptionModel.createdAt)
        .limit(1);
        return subscriptions[0] || null;

    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
}

// Update user subscription 
export async function updateSubscriptionStatus( email: string, endDate: string) {
    try {
        await db.update(subscriptionModel)
        .set({endDate, updatedAt: moment().format('DD/MM/YYYY')})
        .where(eq(subscriptionModel.email, email));

    } catch (error) {
        console.error('Error updating subscription status:', error);
        throw error;
    }
}

// Get the histories user subscription
export async function getHistory(email: string) {
    try {
        const subscriptions = await db.select().from(aiOutputModel)
        .where(eq(aiOutputModel.createdBy, email))
        .orderBy(aiOutputModel.createdAt);
        return subscriptions || null;

    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
}