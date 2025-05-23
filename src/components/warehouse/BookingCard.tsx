
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
  warehousePrice: string;
  warehouseAvailability: string;
  onBookNow: () => void;
}

const BookingCard = ({ 
  warehousePrice, 
  warehouseAvailability, 
  onBookNow 
}: BookingCardProps) => {
  // Check if the price already includes the '/quintal/day' text
  const displayPrice = warehousePrice.includes('/quintal/day') 
    ? warehousePrice 
    : `${warehousePrice}/quintal/day`;

  return (
    <Card className="border-2 border-primary/10">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold">{warehousePrice}</h3>
            <p className="text-sm text-muted-foreground">{warehouseAvailability}</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            Best Value
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Choose your storage quantity and duration on the next page.
            </p>
            <p className="text-sm font-medium">
              Base rate: {warehousePrice}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onBookNow} 
          className="w-full"
          disabled={warehouseAvailability !== 'Available Now'}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
