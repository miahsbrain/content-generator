import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useUserContext } from '@/app/(context)/UserContext';
import { createSubscription } from '@/utils/Db';
import { useSubscription } from '@/app/(context)/SubscriptionContext';

interface PayPalSubscribeButtonProps {
  onSuccess: () => void;
  onError: (error: Error | string) => void;
}

export function PayPalSubscribeButton({ onSuccess, onError }: PayPalSubscribeButtonProps) {
    const [{ isResolved }] = usePayPalScriptReducer();
	const { userEmail } = useUserContext()
	const { refreshSubscription } = useSubscription()

	const paymentSuccess = async(payer_id: string) => {
		await createSubscription(userEmail || '', 'plus', payer_id)
		await refreshSubscription(userEmail || '');
	}

    // const handleSubscription = async (data, actions) => {
	// 	return actions.order.create({
	// 		intent: 'CAPTURE',
	// 		purchase_units: [{
	// 			amount: {
	// 				currency_code: 'USD',
	// 				value: 5.99,
	// 			},
	// 		}],
	// 	});
    // };

  if (!isResolved) {
    return null;
  }

  return (
	<PayPalButtons
		style={{ layout: 'horizontal', tagline: false }}
		createOrder={(data, actions) => {
			return actions.order.create({
				intent: 'CAPTURE',
				purchase_units: [{
					amount: {
						currency_code: 'USD',
						value: '5.99',
					},
				}],
				});
			}}
		onApprove={(data, actions) => {
			if (!actions.order) {
				throw new Error('Actions not defined at PayPal')
			}
			return actions.order.capture().then((details) => {
				if (!details.payer || !details.payer.payer_id) {
					throw new Error('There was a error with paypal response')
				}
				// alert(`Transaction completed by ${details.payer.name?.given_name}`);
				// Add post-transaction handling here
				paymentSuccess(details.payer.payer_id)
				onSuccess()
			});
		}}
		onError={(error) => {
			console.error('PayPal Checkout Error:', error);
			// alert('There was an error processing your payment. Please try again.');
			onError(`${error}`)
		}}
	/>
  );
}