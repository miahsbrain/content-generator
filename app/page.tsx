'use client'

import { useState, useEffect } from 'react'
import HomeHeader from './dashboard/_components/HomeHeader'
import HomeHero from './dashboard/_components/HomeHero'
import HomeFeatures from './dashboard/_components/HomeFeatures'
import HomeStats from './dashboard/_components/HomeStats'
import HomeFooter from './dashboard/_components/HomeFooter'


export default function LandingPage() {
	const [scrollPosition, setScrollPosition] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
			<HomeHeader scrollPosition={scrollPosition} />
			<main className="flex-1">
				<HomeHero />
				<HomeFeatures />
				<HomeStats />
			</main>
			<HomeFooter />
		</div>
	)
}