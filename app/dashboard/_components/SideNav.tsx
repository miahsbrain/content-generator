'use client'

import { useLayoutContext } from '@/app/(context)/LayoutContext'
import { FileClock, Home, Settings, Wallet, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

type MenuList = MenuItem[]

interface MenuItem {
    name: string,
    icon: React.ReactElement,
    path: string
}

const SideNav:React.FC<React.PropsWithChildren> = ({ children }) => {

    const path = usePathname()
    const { showSidebar, setShowSidebar } = useLayoutContext()

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

        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}>
            <div className="flex h-16 items-center justify-between px-4 border-b">
                <div className="flex items-center">
                    <Link href={'/dashboard'}>
                        <Image src={'/logo.svg'} width={120} height={100} alt='logo' className='w-auto h-auto' />
                    </Link>
                </div>
                <button 
                    onClick={() => setShowSidebar(false)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-200"
                >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close sidebar</span>
                </button>
            </div>
            <nav className="p-4">
                <div className="space-y-2">
                    {menuList.map((item: MenuItem, idx: number) => (
                        <Link key={idx} href={item.path}>
                            <div className={`flex gap-2 mb-2 items-center p-2 rounded-md hover:bg-primary hover:text-primary-foreground ${path == item.path && 'bg-primary text-primary-foreground'}`}>
                                {item.icon}
                                <h3>{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                {children}
            </div>
        </aside>

    )
}

export default SideNav