'use client'

import React, { createContext, useState, useContext } from "react";

export interface TotalUsageContextType {
    totalUsage: number,
    setTotalUsage: (totalUsage: number) => void; // Type the setUser function
}

const TotalUsageContext = createContext<TotalUsageContextType | undefined>(undefined)

export const TotalUsageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [totalUsage, setTotalUsage] = useState<number>(0)
    return (
        <div>
            <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
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