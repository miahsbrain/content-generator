'use client'

import React, { createContext, useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
import { getHistory } from "@/utils/Db";
import { aiOutputModelProps } from "@/utils/Schema";
import { useSubscription } from "./SubscriptionContext";

export interface TotalUsageContextType {
    totalUsage: number,
    maxCredits: number,
}

const TotalUsageContext = createContext<TotalUsageContextType | undefined>(undefined)

export const TotalUsageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { userEmail } = useUserContext()
    const { currentPlan } = useSubscription()
    const [totalUsage, setTotalUsage] = useState<number>(0)
    const [maxCredits, setMaxCredits] = useState<number>(() => currentPlan == 'free' ? 10000 : 100000)

    useEffect(() => {
        // Fetch the data
        const fetchData = async () => {
            // Validate email exists
            if (!userEmail) {
                throw new Error("User or email not defined");
            }
            // Get data
            try {
                const fetchedData = await getHistory(userEmail);
                getTotalUsage(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        // Calculate the total usage of `aiResponse` length
        const getTotalUsage = (data: aiOutputModelProps[]) => {
            const total = data.reduce((acc, element) => acc + (element.aiResponse?.length || 0), 0);
            setTotalUsage(total)
            setMaxCredits(currentPlan == 'free' ? 10000 : 100000)
        };

    fetchData();
    }, [userEmail, currentPlan])


    return (
        <div>
            <TotalUsageContext.Provider value={{ totalUsage, maxCredits }}>
                {children}
            </TotalUsageContext.Provider>
        </div>
    )
}

// Custom hook to use the  context
export const useTotalUsage = () => {
    const context = useContext(TotalUsageContext);
    if (!context) {
        throw new Error('useTotalUsage must be used within a TotalUsageContextProvider');
    }
    return context;
};