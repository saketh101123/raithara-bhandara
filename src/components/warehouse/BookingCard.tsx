
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, IndianRupee } from 'lucide-react';

interface BookingCardProps {
  warehousePrice: string;
  warehouseAvailability: string;
  onBookNow: () => void;
}

const BookingCard = ({ warehousePrice, warehouseAvailability, onBookNow }: BookingCardProps) => {
  return (
    <Card className="shadow-lg border-2">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <IndianRupee className="w-5 h-5 mr-2 text-primary" />
          Quick Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Price:</span>
            <span className="text-lg font-bold text-primary">{warehousePrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <span className={`font-medium ${warehouseAvailability === 'Available Now' ? 'text-green-600' : 'text-red-600'}`}>
              {warehouseAvailability}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-2" />
            Flexible booking dates available
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            24/7 access and monitoring
          </div>
        </div>

        <Button 
          className="w-full h-12 text-lg font-semibold" 
          onClick={onBookNow}
          disabled={warehouseAvailability !== 'Available Now'}
        >
          {warehouseAvailability === 'Available Now' ? 'Book Now' : 'Currently Unavailable'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Secure booking • Instant confirmation • 24/7 support
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
