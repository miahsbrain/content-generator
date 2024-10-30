import { Search } from 'lucide-react'
import React from 'react'

const Header: React.FC = () => {
    return (
        <div className='p-2 flex justify-between bg-white'>
            <div className='flex gap-2 p-2 items-center border rounded-sm max-w-md'>
                <Search />
                <input type="search" placeholder='Search...' className='outline-none w-full px-1 rounded-sm' />
            </div>
            <div>
                <h2 className='bg-primary text-primary-foreground p-2 px-4 rounded-full text-xs'>Join Membership for just $5.99/month</h2>
            </div>
        </div>
    )
}

export default Header