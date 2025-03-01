
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

interface WarehouseHeaderProps {
  warehouse: {
    name: string;
    location: string;
    distance: string;
    rating: number;
    image: string;
    available: boolean;
  };
}

const WarehouseHeader = ({ warehouse }: WarehouseHeaderProps) => {
  return (
    <>
      <div className="mb-8">
        <Link to="/warehouses" className="text-primary hover:underline flex items-center gap-1">
          ← Back to Warehouses
        </Link>
      </div>

      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
        <img 
          src={warehouse.image} 
          alt={warehouse.name}
          className="w-full h-full object-cover"
        />
        {!warehouse.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-md font-medium">
              Fully Booked
            </span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary">{warehouse.name}</h1>
            <div className="flex items-center mt-2 text-foreground/70">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{warehouse.location} ({warehouse.distance})</span>
            </div>
          </div>
          <div className="flex items-center bg-primary/5 px-4 py-2 rounded-lg">
            <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
            <span className="font-semibold text-lg">{warehouse.rating}</span>
            <span className="text-foreground/60 ml-1">/5</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseHeader;
