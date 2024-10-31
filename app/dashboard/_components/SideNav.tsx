'use client'

import { FileClock, Home, Settings, Wallet } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

type MenuList = MenuItem[]

interface MenuItem {
    name: string,
    icon: React.ReactElement,
    path: string
}

const SideNav:React.FC = () => {

    const path = usePathname()

    const menuList: MenuList = [
        {
            name: 'Home',
            icon: <Home />,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: <FileClock />,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: <Wallet />,
            path: '/dashboard/billing'
        },
        {
            name: 'Settings',
            icon: <Settings />,
            path: '/dashboard/settings'
        },
    ]

    return (

        <div className='mt-10'>
            {menuList.map((item: MenuItem, idx: number) => (
                <div key={idx} className={`flex gap-2 mb-2 p-3 rounded-sm hover:bg-primary hover:text-primary-foreground ${path == item.path && 'bg-primary text-primary-foreground'}`}>
                    {item.icon}
                    <h3>{item.name}</h3>
                </div>
            ))}
        </div>

    )
}

export default SideNav