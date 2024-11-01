"use client";

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: string; // Set amount dynamically
  currency?: string; // Optionally specify currency
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency = 'USD' }) => {
  const initialOptions = {
    clientId: "",
    currency,
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <h3>Complete Your Purchase</h3>
        <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: currency,
                            value: amount,
                        },
                    }],
                    });
                }}
            onApprove={(data, actions) => {
                if (!actions.order) {
                    throw new Error('Actions not defined at PayPal')
                }
                return actions.order.capture().then((details) => {
                    if (!details.payer) {
                        throw new Error('There was a error with paypal response')
                    }
                    alert(`Transaction completed by ${details.payer.name?.given_name}`);
                    // Add post-transaction handling here
                });
            }}
            onError={(err) => {
                console.error('PayPal Checkout Error:', err);
                alert('There was an error processing your payment. Please try again.');
            }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
