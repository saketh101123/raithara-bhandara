
import React from 'react';
import { Star, MapPin, BadgeCheck, Clock, Calendar } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden w-full">
            <img
              src={imageUrl}
              alt={warehouseName}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <div className="grid grid-cols-3 gap-2 mt-2">
            {/* Additional warehouse images could be added here */}
            <div className="bg-muted rounded-lg overflow-hidden aspect-[4/3]">
              <img src="/lovable-uploads/9019d7ca-efac-4947-b1de-94627f5a9b0e.png" alt="Warehouse interior" className="object-cover w-full h-full" />
            </div>
            <div className="bg-muted rounded-lg overflow-hidden aspect-[4/3]">
              <img src={imageUrl} alt="Warehouse exterior" className="object-cover w-full h-full" />
            </div>
            <div className="bg-muted rounded-lg overflow-hidden aspect-[4/3]">
              <img src={imageUrl} alt="Storage area" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
            <BadgeCheck className="w-3.5 h-3.5 mr-1" /> Verified Facility
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">{warehouseName}</h1>
          
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
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
          
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span><span className="font-medium">Operating Hours:</span> 8:00 AM - 8:00 PM (All days)</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span><span className="font-medium">Established:</span> 2015</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Temperature</div>
              <div className="font-medium">-5° to 5°C</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="font-medium">65-70%</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Capacity</div>
              <div className="font-medium">5,000 tons</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Security</div>
              <div className="font-medium">24/7 Monitored</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseHeader;
