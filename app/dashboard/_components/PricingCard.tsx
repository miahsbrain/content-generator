import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface PricingFeature {
  	text: string;
}

interface PricingCardProps {
	title: string;
	description: string;
	price: number;
	features: PricingFeature[];
	icon: LucideIcon;
	isPopular?: boolean;
	buttonText: string;
	iconColor?: string;
	checkColor?: string;
	textColor?: string;
	className?: string;
	onClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ title, description, price, features, icon: Icon, isPopular, buttonText, iconColor = "text-gray-400", checkColor = "text-green-500", textColor = "text-gray-600", className = "", onClick }) => {

	const baseClasses = "relative rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md w-full";
	const cardClasses = isPopular
		? `${baseClasses} bg-gradient-to-br from-indigo-600 to-purple-600 text-white ${className}`
		: `${baseClasses} bg-white border border-gray-200 ${className}`;

  	return (
		<div className={cardClasses}>
			{isPopular && (
				<div className="absolute -top-2 -right-2">
				<Icon className="w-8 h-8 text-yellow-300 animate-pulse" />
				</div>
			)}
			
			<div className="flex items-center gap-4 mb-6">
				<Icon className={`w-8 h-8 ${isPopular ? "text-indigo-300" : iconColor}`} />
				<div>
					<h2 className={isPopular ? "text-xl font-bold text-white" : "text-xl font-bold text-gray-900"}>
						{title}
					</h2>
					<p className={isPopular ? "text-indigo-200 text-sm" : "text-gray-500 text-sm"}>
						{description}
					</p>
				</div>
			</div>
			
			<div className="mb-6">
				<span className={`text-3xl font-bold ${isPopular ? "text-white" : "text-gray-900"}`}>
					${price}
				</span>
				<span className={isPopular ? "text-indigo-200 text-sm" : "text-gray-500 text-sm"}>/month</span>
			</div>

			{/* Features */}
			<div className="space-y-3 mb-6">
				{features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<Check className={`w-4 h-4 flex-shrink-0 ${isPopular ? "text-indigo-300" : checkColor}`} />
					<span className={isPopular ? "text-indigo-100" : textColor}>
						{feature.text}
					</span>
				</div>
				))}
			</div>

			<button
				onClick={onClick}
				disabled={buttonText === "Current Plan"}
				className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
				buttonText === "Current Plan"
					? "bg-gray-100 text-gray-400 cursor-not-allowed"
					: isPopular
					? "bg-white text-indigo-600 hover:bg-indigo-50"
					: "bg-gray-100 text-gray-900 hover:bg-gray-200"
				}`}
			>
				{buttonText}
			</button>
		</div>
  	);
}