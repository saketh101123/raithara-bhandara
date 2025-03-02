
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Calendar, Package } from 'lucide-react';

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
    <Card className="border-primary/10 shadow-md">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-lg flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="aspect-video rounded-md overflow-hidden mb-4 border border-gray-100">
          <img 
            src={warehouse.image} 
            alt={warehouse.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="font-semibold text-lg mb-1">{warehouse.name}</h3>
        <p className="text-sm text-foreground/70 mb-6">{warehouse.location}</p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
            <span className="text-foreground/70 flex items-center">
              <Package className="w-4 h-4 mr-2 text-primary" />
              Base Price
            </span>
            <span className="font-medium">{warehouse.price}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
            <span className="text-foreground/70 flex items-center">
              <Package className="w-4 h-4 mr-2 text-primary" />
              Quantity
            </span>
            <span className="font-medium">{quantity} quintals</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
            <span className="text-foreground/70 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              Duration
            </span>
            <span className="font-medium">{duration} days</span>
          </div>
          <div className="border-t-2 border-dashed border-primary/10 pt-4 mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span className="text-primary">₹{getTotalPrice()}</span>
            </div>
            <p className="text-xs text-foreground/60 mt-1">
              Includes all taxes and service fees
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-primary/5 border-t border-primary/10 p-4">
        <p className="text-sm">
          By completing this booking, you agree to our <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Cancellation Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingSummary;
