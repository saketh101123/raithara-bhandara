
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';

interface WarehouseDetailsProps {
  warehouse: {
    capacity: string;
    price: string;
    available: boolean;
  };
}

const WarehouseDetailsComponent = ({ warehouse }: WarehouseDetailsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-primary" />
          Storage Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-foreground/70">Capacity</span>
            <span className="font-medium">{warehouse.capacity}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-foreground/70">Price</span>
            <span className="font-medium text-primary">{warehouse.price}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-foreground/70">Availability</span>
            <span className={`font-medium ${warehouse.available ? 'text-green-600' : 'text-red-600'}`}>
              {warehouse.available ? 'Available Now' : 'Fully Booked'}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-foreground/70">Minimum Duration</span>
            <span className="font-medium">1 Month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehouseDetailsComponent;
