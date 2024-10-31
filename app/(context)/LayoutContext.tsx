'use client'

import React, { createContext, useState, useContext } from "react";

export interface LayoutContextType {
    showSidebar: boolean,
    showMobileSearch: boolean,
    setShowSidebar: (value: boolean) => void, // Type the setShowSidebar function
    toggleSidebar: () => void, // Type the toggleSidebar function
    toggleMobileSearch: () => void // Type the toggleMobileSearch function
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const LayoutContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false)
	const [showSidebar, setShowSidebar] = useState<boolean>(false)

	const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch)
	const toggleSidebar = () => setShowSidebar(!showSidebar)

    return (
        <div>
            <LayoutContext.Provider value={{ showSidebar, showMobileSearch, setShowSidebar, toggleSidebar, toggleMobileSearch }}>
                {children}
            </LayoutContext.Provider>
        </div>
    )
}

// Custom hook to use the  context
export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useTotalUsage must be used within a LayoutContextProvider');
    }
    return context;
};