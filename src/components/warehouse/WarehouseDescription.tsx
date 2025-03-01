
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WarehouseDescription = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">About This Facility</h3>
        <p className="mb-4">
          This state-of-the-art cold storage facility provides optimal conditions for preserving your agricultural produce. 
          Equipped with advanced temperature and humidity control systems, it ensures that your crops maintain their freshness and quality for extended periods.
        </p>
        <p>
          The facility offers flexible storage options, 24/7 security, and easy access for loading and unloading. 
          Our experienced staff is dedicated to providing excellent service and ensuring your produce is stored in ideal conditions.
        </p>
      </CardContent>
    </Card>
  );
};

export default WarehouseDescription;
