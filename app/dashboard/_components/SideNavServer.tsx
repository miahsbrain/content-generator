import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import UsageTrack from './UsageTrack'
import SideNav from './SideNav'
import Overlay from './Overlay'


const SideNavServer:React.FC = async () => {

    // Fetch the current user from Clerk (server-side only)
    const user = await currentUser();
	if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress ) {
		throw new Error('User not defined at UsageTrackServer')
	}

    return (
        <>
            {/* Overlay */}
            <Overlay />
            {/* Sidebar */}
            <SideNav>
                <UsageTrack email={ user?.primaryEmailAddress?.emailAddress } />
            </SideNav>
        </>
    )
}

export default SideNavServer