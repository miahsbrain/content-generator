'use client'

import { useLayoutContext } from '@/app/(context)/LayoutContext'
import React from 'react'

const Overlay: React.FC = () => {
    const { showSidebar, setShowSidebar } = useLayoutContext()
    
  return (
        <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            showSidebar ? 'opacity-50 z-40' : 'opacity-0 -z-10'
            } lg:hidden`}
            onClick={() => setShowSidebar(false)}
        >
			
		</div>
  )
}

export default Overlay