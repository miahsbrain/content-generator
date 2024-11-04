import React from "react"
import Image from "next/image"
import Link from "next/link"

const HomeFooter: React.FC = () => {
	return (
		<footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center space-x-2">
                        <Image src={'/logo.svg'} width={120} height={100} alt='logo' className='w-auto h-auto' />
					</div>
					<nav className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-6">
						{['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
							<Link key={item} className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="#">
								{item}
							</Link>
						))}
					</nav>
				</div>
				<div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
					© {new Date().getFullYear()} LoremIpsum. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default HomeFooter