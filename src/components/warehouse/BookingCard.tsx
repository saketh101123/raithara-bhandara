
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<string>("30");
  const [quantity, setQuantity] = useState<string>("10");
  
  const endDate = addDays(startDate, parseInt(duration));
  
  const totalPrice = parseInt(quantity) * parseInt(duration) * parseFloat(warehousePrice.replace(/[^0-9.]/g, ''));
  
  return (
    <Card className="border-2 border-primary/10">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold">{warehousePrice}<span className="text-sm font-normal text-muted-foreground">/ton/day</span></h3>
            <p className="text-sm text-muted-foreground">{warehouseAvailability}</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            Best Value
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(startDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Duration (Days)</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Quantity (Tons)</label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger>
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 tons</SelectItem>
                <SelectItem value="10">10 tons</SelectItem>
                <SelectItem value="20">20 tons</SelectItem>
                <SelectItem value="50">50 tons</SelectItem>
                <SelectItem value="100">100 tons</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>End Date</span>
              <span>{format(endDate, "MMM dd, yyyy")}</span>
            </div>
            
            <div className="flex justify-between font-medium">
              <span>Total Price</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
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
