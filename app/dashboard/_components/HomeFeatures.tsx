import { List, Cpu, Zap } from "lucide-react"

export default function HomeFeatures() {
	const features = [
		{ icon: List, title: "Comprehensive List", color: "indigo", description: "Access a wide range of AI tools for various applications and industries, all in one place." },
		{ icon: Cpu, title: "AI-Powered Insights", color: "pink", description: "Get detailed information and comparisons of different AI tools to make informed decisions." },
		{ icon: Zap, title: "Regular Updates", color: "yellow", description: "Stay up-to-date with the latest AI tools and technologies as our list is constantly growing." }
	]

	return (
		<section className="bg-white dark:bg-gray-900 py-24 sm:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose AI Tools Hub?</h2>
				<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<div key={index} className="flex flex-col items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
							<div className={`rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900 p-3 text-${feature.color}-600 dark:text-${feature.color}-400`}>
								<feature.icon className="h-6 w-6" />
							</div>
							<h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
							<p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}