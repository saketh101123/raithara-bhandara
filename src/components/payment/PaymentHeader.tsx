
import React from 'react';

interface PaymentHeaderProps {
  isBookingComplete: boolean;
}

const PaymentHeader = ({ isBookingComplete }: PaymentHeaderProps) => {
  return (
    <h1 className="text-4xl font-display font-bold text-primary mb-8">
      {isBookingComplete ? "Booking Confirmed" : "Complete Your Booking"}
    </h1>
  );
};

export default PaymentHeader;
