// pages/checkout.tsx
import React from "react";
import PayPalButton from "../_components/PayPalButton";

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <h1>Checkout Page</h1>
        <PayPalButton amount="10.00" />
    </div>
  );
};

export default CheckoutPage;
