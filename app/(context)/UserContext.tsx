'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface UserContextType {
    userEmail: string | null;
    isLoading: boolean;
};

interface UserContextProviderProps {
    children: React.ReactNode,
    userEmail: string 
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children, userEmail:email }) => {
    const { user, isLoaded } = useUser();
    const [userEmail, setUserEmail] = useState<string | null>(email);
  
    useEffect(() => {
        if (isLoaded && user) {
            setUserEmail(user.primaryEmailAddress?.emailAddress || null);
        }
    }, [isLoaded, user]);
  
    return (
        <UserContext.Provider value={{ userEmail, isLoading: !isLoaded }}>
            {children}
        </UserContext.Provider>
    );
  };
  

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
