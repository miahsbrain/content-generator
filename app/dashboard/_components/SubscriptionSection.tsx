'use client'

import React, { useState, useMemo } from 'react';
import { Star, Zap } from 'lucide-react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PricingCard } from './PricingCard';
import { PayPalSubscribeButton } from './PayPalSubscribeButton';
import { useSubscription } from '@/app/(context)/SubscriptionContext';
import { isAfter } from 'date-fns';

const freeTierFeatures = [
	{ text: 'Up to 3 projects' },
	{ text: '1GB storage' },
	{ text: 'Basic support' },
	{ text: 'Core features' },
	{ text: 'Community access' },
];

const plusTierFeatures = [
	{ text: 'Unlimited projects' },
	{ text: '100GB storage' },
	{ text: 'Priority support' },
	{ text: 'Advanced features' },
	{ text: 'Team collaboration' },
	{ text: 'Custom domain' },
	{ text: 'Analytics dashboard' },
	{ text: 'API access' },
];

const paypalOptions = {
  clientId: "",
  currency: 'USD',
};


export function SubscriptionSection() {
	const { currentPlan, expiryDate, isLoading, error, refreshSubscription } = useSubscription();
	const [showPayPal, setShowPayPal] = useState(false);
	const [paymentError, setPaymentError] = useState<string | null>(null);

	const isSubscriptionExpired = useMemo(() => {
		if (!expiryDate) return true;
		return isAfter(new Date(), new Date(expiryDate));
	}, [expiryDate]);

	const handleUpgradeClick = () => {
		setShowPayPal(true);
		setPaymentError(null);
	};

	const handlePaymentSuccess = async () => {
		setShowPayPal(false);
		await refreshSubscription();
	};

	const handlePaymentError = (error: Error | string) => {
		setPaymentError('Payment failed. Please try again.');
		console.error('Payment error:', error);
	};

	if (isLoading) {
		return (
		<div className="h-full w-full flex items-center justify-center">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
		);
	}

	if (error) {
		return (
		<div className="h-full w-full flex items-center justify-center">
			<div className="text-red-500">
				Error loading subscription: {error.message}
			</div>
		</div>
		);
	}

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
			<h1 className="text-2xl font-bold text-gray-900 mb-2">
				Subscription Plans
			</h1>
			<p className="text-sm text-gray-600">
				Choose the plan that works best for you
			</p>
			{currentPlan === 'plus' && !isSubscriptionExpired && (
				<div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md text-sm">
				Your Plus subscription is active until {new Date(expiryDate!).toLocaleDateString()}
				</div>
			)}
			{paymentError && (
				<div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md text-sm">
				{paymentError}
				</div>
			)}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 items-start">
			<PricingCard
				title="Free"
				description="Perfect to get started"
				price={0}
				features={freeTierFeatures}
				icon={Zap}
				buttonText={currentPlan === 'free' ? "Current Plan" : "Downgrade"}
			/>

			<div className="space-y-4">
				<PricingCard
				title="Plus"
				description="For professionals"
				price={5.99}
				features={plusTierFeatures}
				icon={Star}
				isPopular={true}
				buttonText={
					currentPlan === 'plus' && !isSubscriptionExpired
					? "Current Plan"
					: "Upgrade Now"
				}
				onClick={handleUpgradeClick}
				/>

				{showPayPal && (
				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
					<PayPalScriptProvider options={paypalOptions}>
						<PayPalSubscribeButton
							onSuccess={handlePaymentSuccess}
							onError={handlePaymentError}
						/>
					</PayPalScriptProvider>
				</div>
				)}
			</div>
        </div>

        <div className="mt-8 text-center">
			<p className="text-sm text-gray-500">
				30-day money-back guarantee • Cancel anytime
			</p>
        </div>
      </div>
    </div>
  );
}