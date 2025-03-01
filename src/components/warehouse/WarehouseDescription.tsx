
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Building, Shield, Clock, Thermometer } from 'lucide-react';

const WarehouseDescription = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">About This Facility</h3>
        
        <p className="mb-4">
          This state-of-the-art cold storage facility provides optimal conditions for preserving your agricultural produce. 
          Equipped with advanced temperature and humidity control systems, it ensures that your crops maintain their freshness and quality for extended periods.
        </p>
        
        <p className="mb-6">
          The facility offers flexible storage options, 24/7 security, and easy access for loading and unloading. 
          Our experienced staff is dedicated to providing excellent service and ensuring your produce is stored in ideal conditions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Easy Loading/Unloading</h4>
              <p className="text-sm text-muted-foreground">Multiple loading docks with automated systems for efficient handling</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Modern Infrastructure</h4>
              <p className="text-sm text-muted-foreground">Built with eco-friendly materials and energy-efficient systems</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Advanced Security</h4>
              <p className="text-sm text-muted-foreground">24/7 surveillance, access control, and fire protection systems</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Flexible Access Hours</h4>
              <p className="text-sm text-muted-foreground">Extended access hours for farmers and distributors</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <div className="flex items-center mb-2">
            <Thermometer className="h-5 w-5 text-accent mr-2" />
            <h4 className="font-medium">Temperature-Controlled Environment</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Our facility maintains precise temperature zones optimized for different types of produce. From root vegetables to fresh fruits, 
            we ensure the ideal storage conditions to maximize shelf life and preserve nutritional value.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehouseDescription;
