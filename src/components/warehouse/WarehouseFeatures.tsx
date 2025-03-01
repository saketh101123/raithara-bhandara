
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThermometerSnowflake, CheckCircle } from 'lucide-react';

interface WarehouseFeaturesProps {
  features: string[];
}

const WarehouseFeatures = ({ features }: WarehouseFeaturesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ThermometerSnowflake className="w-5 h-5 mr-2 text-primary" />
          Facility Features
        </h3>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WarehouseFeatures;
