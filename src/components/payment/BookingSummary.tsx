
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

interface BookingSummaryProps {
  warehouse: {
    name: string;
    location: string;
    image: string;
    price: string;
  };
  quantity: string;
  duration: string;
  getTotalPrice: () => number;
}

const BookingSummary = ({ warehouse, quantity, duration, getTotalPrice }: BookingSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-md overflow-hidden mb-4">
          <img 
            src={warehouse.image} 
            alt={warehouse.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="font-semibold text-lg mb-1">{warehouse.name}</h3>
        <p className="text-sm text-foreground/70 mb-6">{warehouse.location}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-foreground/70">Base Price</span>
            <span>{warehouse.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/70">Quantity</span>
            <span>{quantity} quintals</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/70">Duration</span>
            <span>{duration} days</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <p className="text-xs text-foreground/60 mt-1">
              Includes all taxes and service fees
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-primary/5 border-t">
        <p className="text-sm">
          By completing this booking, you agree to our <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Cancellation Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingSummary;
