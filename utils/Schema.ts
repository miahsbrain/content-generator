import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import moment from "moment";

export interface aiOutputModelProps {
    id: number,
    formData: string,
    aiResponse: string | null,
    templateSlug: string,
    createdBy: string,
    createdAt: string | null
}

// Subscription interface
export interface subscriptionModelProps {
    id: number;
    email: string;
    plan: 'free' | 'plus';
    price: number;
    startDate: string;
    endDate: string;
    paypalSubscriptionId: string;
    createdAt: string;
    updatedAt: string;
}


export const aiOutputModel = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: text('aiResponse'),
    templateSlug: varchar('templateSlug').notNull(),
    createdBy: varchar('email').notNull(),
    createdAt: varchar('createdAt')
})

export const subscriptionModel = pgTable('subscriptionModel', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    plan: varchar('plan').notNull(),
    price: integer('price').notNull().default(0),
    startDate: varchar('startDate').notNull().default(moment().format('DD/MM/YYYY')),
    endDate: varchar('endDate').notNull(),
    paypalSubscriptionId: varchar('paypalSubscriptionId').notNull(),
    createdAt: varchar('createdAt').default(moment().format('DD/MM/YYYY')),
    updatedAt: varchar('updatedAt').default(moment().format('DD/MM/YYYY')),
})