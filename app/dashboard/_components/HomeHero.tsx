import React from 'react'
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const HomeHero: React.FC = () => {
	return (
		<section className="relative overflow-hidden bg-gray-50 dark:bg-gray-800">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="text-center md:text-left">
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
							Discover the Future of <span className="text-orange-600 dark:text-orange-400">AI Tools</span>
						</h1>
						<p className="text-xl sm:text-2xl mb-10 text-gray-600 dark:text-gray-300">
							Explore our curated list of cutting-edge AI tools to enhance your productivity and creativity.
						</p>
						<Link href="/dashboard" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-300 ease-in-out">
							Get Started
							<ArrowRight className="ml-2 -mr-1 h-5 w-5" />
						</Link>
					</div>
					<div className="hidden md:block">
						<Image src="/home-illustraton.jpg" width={300} height={300} alt="AI Tools Illustration" className="w-full h-auto rounded-lg shadow-2xl" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default HomeHero