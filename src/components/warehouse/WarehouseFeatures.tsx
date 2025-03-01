
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThermometerSnowflake, CheckCircle, Warehouse, Lock, Truck, ShieldCheck } from 'lucide-react';

interface WarehouseFeaturesProps {
  features: string[];
}

const WarehouseFeatures = ({ features }: WarehouseFeaturesProps) => {
  // Define feature icons based on feature text
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('cooling'))
      return <ThermometerSnowflake className="w-5 h-5 text-blue-500" />;
    if (feature.toLowerCase().includes('security') || feature.toLowerCase().includes('secure'))
      return <Lock className="w-5 h-5 text-red-500" />;
    if (feature.toLowerCase().includes('loading') || feature.toLowerCase().includes('transport'))
      return <Truck className="w-5 h-5 text-purple-500" />;
    if (feature.toLowerCase().includes('certified') || feature.toLowerCase().includes('compliance'))
      return <ShieldCheck className="w-5 h-5 text-green-500" />;
    return <Warehouse className="w-5 h-5 text-amber-500" />;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ThermometerSnowflake className="w-5 h-5 mr-2 text-primary" />
          Facility Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start bg-muted/40 p-3 rounded-lg hover:bg-muted/60 transition-colors">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                {getFeatureIcon(feature)}
              </div>
              <div>
                <span className="text-sm">{feature}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Additional Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Staff Support", "Forklift Services", "Packaging Area", "Quality Testing", "Pest Control", "Backup Power"].map((amenity, idx) => (
              <div key={idx} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5 shrink-0" />
                <span className="text-xs">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehouseFeatures;
