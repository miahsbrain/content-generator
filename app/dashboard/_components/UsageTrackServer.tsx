import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import UsageTrack from './UsageTrack';

// export type User = Awaited<ReturnType<typeof currentUser>>

const UsageTrackServer: React.FC = async () => {

	// Fetch the current user from Clerk (server-side only)
    const user = await currentUser();
	if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress ) {
		throw new Error('User not defined at UsageTrackServer')
	}	

	// Pass the user data as a prop to the client component
    return (
		<div>
			<UsageTrack email={ user?.primaryEmailAddress?.emailAddress } />;
		</div>
	)

}

export default UsageTrackServer