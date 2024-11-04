import { Users, Wrench, Star } from "lucide-react"

export default function HomeStats() {
	const stats = [
		{ icon: Users, value: '100,000+', label: 'Active Users' },
		{ icon: Wrench, value: '500+', label: 'AI Tools' },
		{ icon: Star, value: '4.9/5', label: 'User Rating' },
	]

	return (
		<section className="bg-orange-600 dark:bg-orange-900 text-white py-24 sm:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Trusted by Innovators Worldwide</h2>
					<p className="text-xl text-orange-100">Join the growing community of AI enthusiasts and professionals</p>
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{stats.map((stat, index) => (
						<div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
							<div className="flex justify-center mb-4">
								<stat.icon className="h-12 w-12 text-orange-300" />
							</div>
							<div className="text-4xl font-bold mb-2">{stat.value}</div>
							<div className="text-lg text-orange-200">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}