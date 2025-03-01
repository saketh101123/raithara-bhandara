
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BadgePercent } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface BookingCardProps {
  warehouse: {
    id: number;
    price: string;
    available: boolean;
  };
}

const BookingCard = ({ warehouse }: BookingCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBooking = () => {
    if (!user) {
      toast.info("Please log in to book storage");
      navigate('/login', { state: { returnUrl: `/warehouse/${warehouse.id}` } });
      return;
    }

    if (warehouse && warehouse.available) {
      navigate(`/payment/${warehouse.id}`);
    } else {
      toast.error("This facility is currently unavailable for booking");
    }
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Book This Storage</h3>
        <div className="mb-6">
          <div className="text-2xl font-bold text-primary mb-1">{warehouse?.price}</div>
          <div className="text-sm text-foreground/60">per quintal per day</div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-primary mr-3" />
            <div>
              <p className="font-medium">Immediate Availability</p>
              <p className="text-sm text-foreground/60">Book now to secure your storage</p>
            </div>
          </div>
          <div className="flex items-center">
            <BadgePercent className="w-5 h-5 text-primary mr-3" />
            <div>
              <p className="font-medium">10% discount on 3+ months</p>
              <p className="text-sm text-foreground/60">Long-term benefits available</p>
            </div>
          </div>
        </div>

        <Button 
          className="w-full text-base py-6" 
          disabled={!warehouse?.available}
          onClick={handleBooking}
        >
          {!user ? 'Login & Book Storage' : (warehouse?.available ? 'Book Storage Now' : 'Currently Unavailable')}
        </Button>
        
        {!warehouse?.available && (
          <p className="text-sm text-center mt-3 text-foreground/60">
            This facility is currently fully booked. Please check back later or explore other options.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
