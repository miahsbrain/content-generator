import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { UserContextProvider } from './UserContext';


const UserContextProviderServer:React.FC<React.PropsWithChildren> = async ({ children }) => {

    // Fetch the current user from Clerk (server-side only)
    const user = await currentUser();
	if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress ) {
		throw new Error('User not defined at UserContextProviderServer')
	}

    return (
        <>
            <UserContextProvider userEmail={user?.primaryEmailAddress?.emailAddress}>
                { children }
            </UserContextProvider>
        </>
    )
}

export default UserContextProviderServer