
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Calendar, Truck, MapPin, Package } from 'lucide-react';

interface LogisticsBookingSummaryProps {
  plan: {
    planName: string;
    price: string;
    planId: string;
  };
  farmAddress: string;
  cropType: string;
  estimatedWeight: string;
  getTotalPrice: () => number;
}

const LogisticsBookingSummary = ({ plan, farmAddress, cropType, estimatedWeight, getTotalPrice }: LogisticsBookingSummaryProps) => {
  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic-logistics': return '🥉';
      case 'standard-logistics': return '🥈';
      case 'advanced-logistics': return '🥇';
      default: return '📦';
    }
  };

  const getPlanFeatures = (planId: string) => {
    switch (planId) {
      case 'basic-logistics':
        return ['Pickup within 20km', 'Shared transport', '24hr scheduling', 'Basic support'];
      case 'standard-logistics':
        return ['Pickup within 50km', 'Dedicated vehicle', 'Real-time tracking', 'Same-day pickup'];
      case 'advanced-logistics':
        return ['State-wide coverage', 'Cold chain transport', 'Multiple deliveries', 'Dedicated manager'];
      default:
        return [];
    }
  };

  return (
    <Card className="border-primary/10 shadow-md">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-lg flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
          Subscription Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{getPlanIcon(plan.planId)}</span>
            <div>
              <h3 className="font-semibold text-lg">{plan.planName}</h3>
              <p className="text-sm text-foreground/70">Monthly Subscription</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
            <span className="text-foreground/70 flex items-center">
              <Truck className="w-4 h-4 mr-2 text-primary" />
              Monthly Plan
            </span>
            <span className="font-medium">{plan.price}/month</span>
          </div>
          
          {farmAddress && (
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <span className="text-foreground/70 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Pickup Location
              </span>
              <span className="font-medium text-right text-sm max-w-[150px] truncate" title={farmAddress}>
                {farmAddress}
              </span>
            </div>
          )}
          
          {cropType && (
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <span className="text-foreground/70 flex items-center">
                <Package className="w-4 h-4 mr-2 text-primary" />
                Crop Type
              </span>
              <span className="font-medium">{cropType}</span>
            </div>
          )}
          
          {estimatedWeight && (
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
              <span className="text-foreground/70 flex items-center">
                <Package className="w-4 h-4 mr-2 text-primary" />
                Est. Weight
              </span>
              <span className="font-medium">{estimatedWeight} MT</span>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-medium text-sm mb-2 text-green-800">Plan Features:</h4>
            <ul className="text-xs text-green-700 space-y-1">
              {getPlanFeatures(plan.planId).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-green-600 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t-2 border-dashed border-primary/10 pt-4 mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Monthly Amount</span>
              <span className="text-primary">₹{getTotalPrice()}</span>
            </div>
            <p className="text-xs text-foreground/60 mt-1">
              Billed monthly, cancel anytime
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-primary/5 border-t border-primary/10 p-4">
        <p className="text-sm">
          By subscribing, you agree to our <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Logistics Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LogisticsBookingSummary;
