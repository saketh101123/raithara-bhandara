
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PaymentHeaderProps {
  isBookingComplete: boolean;
}

const PaymentHeader = ({ isBookingComplete }: PaymentHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-display font-bold text-primary">
        {isBookingComplete ? "Booking Confirmed" : "Complete Your Booking"}
      </h1>
      
      {isBookingComplete && (
        <div className="mt-4">
          <Link to="/dashboard" className="text-sm text-primary inline-flex items-center hover:underline">
            View all your bookings in dashboard
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentHeader;
