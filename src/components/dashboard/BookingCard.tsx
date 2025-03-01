
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Calendar, MapPin, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
  id: string;
  warehouseName: string;
  location: string;
  startDate: string;
  endDate: string;
  quantity: number;
  status: 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  onViewDetails: (id: string) => void;
}

const BookingCard = ({
  id,
  warehouseName,
  location,
  startDate,
  endDate,
  quantity,
  status,
  totalAmount,
  onViewDetails
}: BookingCardProps) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{warehouseName}</CardTitle>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{quantity} quintals</span>
          </div>
          <div className="mt-2">
            <p className="font-medium">Total: ₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(id)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
