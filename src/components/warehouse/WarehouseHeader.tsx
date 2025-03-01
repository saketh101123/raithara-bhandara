
import React from 'react';
import { Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface WarehouseHeaderProps {
  warehouseName: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

const WarehouseHeader = ({
  warehouseName,
  location,
  rating,
  reviewCount,
  imageUrl
}: WarehouseHeaderProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start mb-4 md:mb-6 gap-4">
        <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden w-full md:w-1/3 lg:w-1/4">
          <img
            src={imageUrl}
            alt={warehouseName}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">{warehouseName}</h1>
          
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span>{location}</span>
          </div>
          
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseHeader;
