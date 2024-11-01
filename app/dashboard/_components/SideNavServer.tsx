import React from 'react'
import UsageTrack from './UsageTrack'
import SideNav from './SideNav'
import Overlay from './Overlay'


const SideNavServer:React.FC = async () => {

    return (
        <>
            {/* Overlay */}
            <Overlay />
            {/* Sidebar */}
            <SideNav>
                <UsageTrack  />
            </SideNav>
        </>
    )
}

export default SideNavServer