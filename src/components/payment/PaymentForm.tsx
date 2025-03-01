
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentFormProps {
  formData: {
    quantity: string;
    duration: string;
    startDate: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    upi: string;
    paymentMethod: 'card' | 'upi';
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePaymentMethodChange: (method: 'card' | 'upi') => void;
  handleSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  getTotalPrice: () => number;
  user: any;
}

const PaymentForm = ({
  formData,
  handleInputChange,
  handlePaymentMethodChange,
  handleSubmit,
  isProcessing,
  getTotalPrice,
  user
}: PaymentFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Booking Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity (quintals)
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium mb-2">
                  Duration (days)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Customer Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={`${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={user?.email || ''}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={user?.user_metadata?.phone_number || ''}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Payment Method</h3>
            
            <div className="flex space-x-4 mb-6">
              <Button 
                type="button"
                variant={formData.paymentMethod === 'card' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => handlePaymentMethodChange('card')}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Card
              </Button>
              <Button 
                type="button"
                variant={formData.paymentMethod === 'upi' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => handlePaymentMethodChange('upi')}
              >
                <div className="mr-2 font-bold text-lg">UPI</div> Pay
              </Button>
            </div>
            
            {formData.paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required={formData.paymentMethod === 'card'}
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                    Cardholder Name
                  </label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Name on card"
                    required={formData.paymentMethod === 'card'}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required={formData.paymentMethod === 'card'}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required={formData.paymentMethod === 'card'}
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="upi" className="block text-sm font-medium mb-2">
                  UPI ID
                </label>
                <Input
                  id="upi"
                  name="upi"
                  value={formData.upi}
                  onChange={handleInputChange}
                  placeholder="yourname@upi"
                  required={formData.paymentMethod === 'upi'}
                />
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${getTotalPrice()}`}
          </Button>
          
          <p className="text-xs text-center text-gray-500 flex items-center justify-center">
            <Lock size={12} className="mr-1" /> Secured by RazerPay
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
