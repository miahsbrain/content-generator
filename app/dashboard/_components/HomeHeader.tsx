'use client'

import { useState } from 'react'
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'

export default function HomeHeader({ scrollPosition }: { scrollPosition: number }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className={`sticky top-0 z-50 transition-all duration-300 ${
			scrollPosition > 0 ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'
		}`}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link className="flex items-center space-x-2" href="/">
                        <Image src={'/logo.svg'} width={120} height={100} alt='logo' className='w-auto h-auto' />
					</Link>
					<nav className="hidden md:flex space-x-8">
						{['Features', 'Pricing', 'About', 'Contact'].map((item) => (
							<Link key={item} className="text-sm font-medium text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors" href="#">
								{item}
							</Link>
						))}
					</nav>
					<div className="relative md:hidden">
						<button
							className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span className="sr-only">Open menu</span>
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
						{isMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
								{['Features', 'Pricing', 'About', 'Contact'].map((item) => (
									<Link
										key={item}
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
										onClick={() => setIsMenuOpen(false)}
									>
										{item}
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}