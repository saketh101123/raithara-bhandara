
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import PaymentHeader from '@/components/payment/PaymentHeader';
import ErrorState from '@/components/payment/ErrorState';
import LogisticsPaymentForm from '@/components/payment/LogisticsPaymentForm';
import LogisticsBookingSummary from '@/components/payment/LogisticsBookingSummary';
import LogisticsBookingConfirmation from '@/components/payment/LogisticsBookingConfirmation';

const LogisticsPayment = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Get plan details from localStorage
  const [planDetails, setPlanDetails] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    farmAddress: '',
    pickupDate: '',
    cropType: '',
    estimatedWeight: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upi: '',
    paymentMethod: 'card' as 'card' | 'upi'
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
    // Get plan details from localStorage
    const storedPlan = localStorage.getItem('selectedLogisticsPlan');
    if (storedPlan) {
      setPlanDetails(JSON.parse(storedPlan));
    }
  }, []);

  useEffect(() => {
    if (!authChecked) {
      if (!user) {
        toast.error("Please log in to book logistics services");
        navigate('/login', { state: { returnUrl: `/payment/logistics/${planId}` } });
      }
      setAuthChecked(true);
    }
  }, [user, authChecked, navigate, planId]);
  
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, pickupDate: formattedDate }));
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
      
      const bookingId = `LG${Math.floor(Math.random() * 10000)}`;
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
      toast.success("Payment successful! Your logistics plan is activated.");
    }, 2000);
  };

  const getTotalPrice = () => {
    if (!planDetails) return 0;
    return parseInt(planDetails.price.replace(/[^0-9]/g, ''));
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
          <title>Logistics Booking Confirmation - ${bookingDetails.bookingId}</title>
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
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Raithara Bhandara</div>
            <div class="title">Logistics Booking Confirmation</div>
          </div>
          <div class="details">
            <div class="row">
              <div class="label">Booking ID:</div>
              <div class="value">${bookingDetails.bookingId}</div>
            </div>
            <div class="row">
              <div class="label">Plan:</div>
              <div class="value">${planDetails?.planName}</div>
            </div>
            <div class="row">
              <div class="label">Customer Name:</div>
              <div class="value">${bookingDetails.userName}</div>
            </div>
            <div class="row">
              <div class="label">Total Amount:</div>
              <div class="value">₹${bookingDetails.totalAmount}</div>
            </div>
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

  const handleGoBack = () => {
    navigate('/pricing');
  };

  if (!planDetails) {
    return (
      <ErrorState 
        title="Plan Not Found"
        description="Sorry, we couldn't find the logistics plan you're looking for."
        buttonText="Browse Available Plans"
        buttonUrl="/pricing"
        icon={<AlertCircle className="mx-auto text-red-500 mb-4" size={64} />}
      />
    );
  }

  if (!user && authChecked) {
    return (
      <ErrorState 
        title="Authentication Required"
        description="Please log in to continue with your logistics booking."
        buttonText="Log In"
        buttonUrl="/login"
      />
    );
  }

  if (!authChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plans
        </Button>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <PaymentHeader isBookingComplete={bookingComplete} />
          
          {!bookingComplete && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{planDetails.planId === 'basic-logistics' ? '🥉' : planDetails.planId === 'standard-logistics' ? '🥈' : '🥇'}</span>
                <div>
                  <h3 className="font-medium text-lg">{planDetails.planName}</h3>
                  <p className="text-muted-foreground">Monthly logistics subscription</p>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 inline-block text-sm">
                <span className="font-medium">Monthly Price:</span> {planDetails.price}
              </div>
            </div>
          )}

          {bookingComplete ? (
            <LogisticsBookingConfirmation 
              bookingDetails={bookingDetails}
              planName={planDetails.planName}
              farmAddress={formData.farmAddress}
              cropType={formData.cropType}
              estimatedWeight={formData.estimatedWeight}
              pickupDate={formData.pickupDate}
              printRef={printRef}
              handlePrint={handlePrint}
              handleDownloadPDF={handleDownloadPDF}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <LogisticsPaymentForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handlePaymentMethodChange={handlePaymentMethodChange}
                  handleSubmit={handleSubmit}
                  isProcessing={isProcessing}
                  getTotalPrice={getTotalPrice}
                  user={user}
                />
              </div>
              
              <div className="lg:col-span-1 order-1 lg:order-2">
                <LogisticsBookingSummary 
                  plan={planDetails}
                  farmAddress={formData.farmAddress}
                  cropType={formData.cropType}
                  estimatedWeight={formData.estimatedWeight}
                  getTotalPrice={getTotalPrice}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsPayment;
