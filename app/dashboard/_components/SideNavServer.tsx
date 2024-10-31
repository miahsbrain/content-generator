import React from 'react'
import UsageTrackServer from './UsageTrackServer'
import SideNav from './SideNav'
import Image from 'next/image'

const SideNavServer:React.FC = () => {

    return (
        <div className='h-screen p-5 shadow-sm bg-white'>
            <div className="flex justify-center">
                <Image src={'/logo.svg'} width={120} height={100} alt='logo' className='w-auto h-auto' />
            </div>
        
            <div className='mt-10'>
                <SideNav />
                <div className='absolute bottom-2 left-0 w-full'>
                    <UsageTrackServer />
                </div>
            </div>

        </div>
    )
}

export default SideNavServer