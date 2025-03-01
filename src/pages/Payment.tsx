import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Lock, Check, AlertCircle, Printer, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { warehousesData } from '@/data/warehousesData';

const Payment = () => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  
  const warehouse = warehousesData.find(w => w.id === Number(warehouseId));
  
  const [formData, setFormData] = useState({
    quantity: '10', // in quintals
    duration: '7', // in days
    startDate: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upi: '',
    paymentMethod: 'card' // 'card' or 'upi'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    totalAmount: 0,
    bookingDate: ''
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to book storage");
      navigate('/login', { state: { returnUrl: `/payment/${warehouseId}` } });
    }
  }, [user, navigate, warehouseId]);
  
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, startDate: formattedDate }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'card' | 'upi') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      const bookingId = `RB${Math.floor(Math.random() * 10000)}`;
      const userName = `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`;
      const userEmail = user?.email || '';
      const userPhone = user?.user_metadata?.phone_number || '';
      const totalAmount = getTotalPrice();
      const bookingDate = new Date().toLocaleDateString();
      
      setBookingDetails({
        bookingId,
        userName,
        userEmail,
        userPhone,
        totalAmount,
        bookingDate
      });
      
      setBookingComplete(true);
      toast.success("Payment successful! Your storage is booked.");
    }, 2000);
  };

  const getTotalPrice = () => {
    if (!warehouse) return 0;
    const pricePerDay = parseInt(warehouse.price.replace(/[^0-9]/g, ''));
    return pricePerDay * Number(formData.quantity) * Number(formData.duration);
  };

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Could not open print window. Please check your popup settings.");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Confirmation - ${bookingDetails.bookingId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #166534; }
            .title { font-size: 20px; margin: 10px 0; }
            .details { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            .row { display: flex; margin-bottom: 10px; }
            .label { font-weight: bold; width: 200px; }
            .value { flex: 1; }
            .footer { margin-top: 40px; text-align: center; font-size: 14px; color: #666; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Raithara Bhandara</div>
            <div class="title">Booking Confirmation</div>
          </div>
          <div class="details">
            <div class="row">
              <div class="label">Booking ID:</div>
              <div class="value">${bookingDetails.bookingId}</div>
            </div>
            <div class="row">
              <div class="label">Customer Name:</div>
              <div class="value">${bookingDetails.userName}</div>
            </div>
            <div class="row">
              <div class="label">Email:</div>
              <div class="value">${bookingDetails.userEmail}</div>
            </div>
            <div class="row">
              <div class="label">Phone:</div>
              <div class="value">${bookingDetails.userPhone}</div>
            </div>
            <div class="row">
              <div class="label">Warehouse:</div>
              <div class="value">${warehouse?.name}</div>
            </div>
            <div class="row">
              <div class="label">Location:</div>
              <div class="value">${warehouse?.location}</div>
            </div>
            <div class="row">
              <div class="label">Quantity:</div>
              <div class="value">${formData.quantity} quintals</div>
            </div>
            <div class="row">
              <div class="label">Duration:</div>
              <div class="value">${formData.duration} days</div>
            </div>
            <div class="row">
              <div class="label">Start Date:</div>
              <div class="value">${formData.startDate}</div>
            </div>
            <div class="row">
              <div class="label">Total Amount:</div>
              <div class="value">₹${bookingDetails.totalAmount}</div>
            </div>
            <div class="row">
              <div class="label">Booking Date:</div>
              <div class="value">${bookingDetails.bookingDate}</div>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Raithara Bhandara for your storage needs.</p>
            <p>For any assistance, please contact our support at support@raitharabhandara.com</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const handleDownloadPDF = () => {
    toast.info("PDF generation would be implemented with a library like jsPDF");
  };

  if (!warehouse) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Warehouse Not Found</h1>
          <p className="text-lg text-foreground/80 mb-8">
            Sorry, we couldn't find the warehouse you're looking for.
          </p>
          <Button onClick={() => navigate('/warehouses')}>
            Browse Available Warehouses
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <AlertCircle className="mx-auto text-yellow-500 mb-4" size={64} />
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Authentication Required</h1>
          <p className="text-lg text-foreground/80 mb-8">
            Please log in to continue with your booking.
          </p>
          <Button onClick={() => navigate('/login', { state: { returnUrl: `/payment/${warehouseId}` } })}>
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-display font-bold text-primary mb-8">
          {bookingComplete ? "Booking Confirmed" : "Complete Your Booking"}
        </h1>

        {bookingComplete ? (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="rounded-full bg-green-100 p-3 inline-flex mb-6">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your storage is booked!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for booking with Raithara Bhandara. Your storage space is confirmed at {warehouse.name}.
              </p>
              
              <div ref={printRef} className="border border-gray-200 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold mb-4 text-gray-700">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium">{bookingDetails.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-medium">{bookingDetails.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{bookingDetails.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{bookingDetails.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{bookingDetails.userPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Warehouse</p>
                    <p className="font-medium">{warehouse.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{warehouse.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{formData.quantity} quintals</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{formData.duration} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{formData.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">₹{bookingDetails.totalAmount}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Printer size={16} />
                  Print Receipt
                </Button>
                <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2">
                  <FileText size={16} />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => navigate('/warehouses')}>
                  Browse More Warehouses
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
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
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md overflow-hidden mb-4">
                    <img 
                      src={warehouse.image} 
                      alt={warehouse.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{warehouse.name}</h3>
                  <p className="text-sm text-foreground/70 mb-6">{warehouse.location}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Base Price</span>
                      <span>{warehouse.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Quantity</span>
                      <span>{formData.quantity} quintals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Duration</span>
                      <span>{formData.duration} days</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{getTotalPrice()}</span>
                      </div>
                      <p className="text-xs text-foreground/60 mt-1">
                        Includes all taxes and service fees
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/5 border-t">
                  <p className="text-sm">
                    By completing this booking, you agree to our <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Cancellation Policy</a>.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
