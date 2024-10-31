'use client'

import { useLayoutContext } from '@/app/(context)/LayoutContext'
import { Search, Menu, ArrowLeft, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const Header: React.FC = () => {

    const [showBackButton] = useState<boolean>(false)
    const { showMobileSearch, toggleSidebar, toggleMobileSearch } = useLayoutContext()

    return (
        <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6 w-full'>
            <div className='flex items-center gap-4 flex-1'>
                <Button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md">
                    <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
                </Button>
                {showBackButton && (
                <Button><ArrowLeft /> Back</Button>
                )}
                <div className={`transition-all duration-300 ease-in-out ${showMobileSearch ? 'w-full' : 'w-0'} overflow-hidden lg:w-auto lg:flex lg:gap-4`}>
                    <input 
                        placeholder="Search..." 
                        className="w-full lg:w-[300px] px-3 py-2 border rounded-md"
                    />
                </div>
            </div>
            <div className="flex items-center">
                <button onClick={toggleMobileSearch} className="lg:hidden p-2 rounded-md hover:bg-gray-200">
                {showMobileSearch ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Search className="h-6 w-6" />
                )}
                <span className="sr-only">
                    {showMobileSearch ? 'Close search' : 'Open search'}
                </span>
                </button>
            </div>

        </header>
    )
}

export default Header