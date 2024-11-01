'use client'

import React, { createContext, useEffect, useContext, useState } from 'react';
import { getCurrentSubscription } from '@/utils/Db';
import moment from 'moment';
import { useUserContext } from './UserContext';

interface SubscriptionContextType {
    currentPlan: 'free' | 'plus',
    expiryDate: string | null,
    isLoading: boolean,
    error: Error | null,
    setSubscription: (plan: 'free' | 'plus', expiryDate: string | null) => void,
    refreshSubscription: (email: string) => Promise<void>
}

interface subscriptionStateProps {
    currentPlan: 'free' | 'plus',
    expiryDate: string | null,
    isLoading: boolean,
    error: Error | null,
}


const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export const SubscriptionContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const { userEmail } = useUserContext()

    // Subscription state
    const [subscriptionState, setSubscriptionState] = useState<subscriptionStateProps>({
        currentPlan: 'free',
        expiryDate: '',
        isLoading: true,
        error: null
    })

    // Set default subscription from database
    
    const fetchSubscription = async (email: string) => {
        try {
            setSubscriptionState(prev => ({...prev, isLoading:true, error: null}))
            const subscription = await getCurrentSubscription(email)

            if (subscription) {
                const isExpired = moment(subscription.endDate, 'DD/MM/YYYY').isBefore(moment());
                setSubscriptionState(prev => ({
                    ...prev,
                    currentPlan: isExpired ? 'free' : subscription.plan == 'plus' ? 'plus' : 'free',
                    expiryDate: isExpired ? null : subscription.endDate,
                    isLoading: false,
                }))
            } else {
                setSubscriptionState(prev => ({
                    ...prev,
                    currentPlan: 'free',
                    expiryDate: null,
                    isLoading: false,
                }))
            }

        } catch (error) {
            setSubscriptionState(prev => ({
                ...prev,
                error: error as Error,
                isLoading: false,
            }));
        }
    }
    // Set subscription state on mount
    useEffect(() => {
        fetchSubscription(userEmail || '');
    }, [userEmail])

    // Set the current subscription if upgrade
    const setSubscription = async ( plan: 'free' | string, expiryDate: string | null ) => {
        setSubscriptionState({
            ...subscriptionState,
            currentPlan: plan == 'plus' ? 'plus' : 'free',
            expiryDate,
        })
    }

    return (
        <SubscriptionContext.Provider value={{ ...subscriptionState, setSubscription, refreshSubscription: fetchSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
}