
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Import the components
import PaymentHeader from '@/components/payment/PaymentHeader';
import ErrorState from '@/components/payment/ErrorState';
import PaymentForm from '@/components/payment/PaymentForm';
import BookingSummary from '@/components/payment/BookingSummary';
import BookingConfirmation from '@/components/payment/BookingConfirmation';
import { Button } from '@/components/ui/button';

interface Warehouse {
  id: number;
  name: string;
  location: string;
  price: number;
  available: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const Payment = () => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    quantity: '10', // in metric tons
    duration: '7', // in days
    startDate: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upi: '',
    paymentMethod: 'card' as 'card' | 'upi' // 'card' or 'upi'
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

  // Fetch warehouse data from database
  useEffect(() => {
    const fetchWarehouse = async () => {
      // Get warehouse ID from URL params or search params
      const id = warehouseId || searchParams.get('warehouseId');
      
      if (!id) {
        setError('Invalid warehouse ID');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('warehouses')
          .select('*')
          .eq('id', parseInt(id))
          .single();

        if (fetchError) {
          console.error('Error fetching warehouse:', fetchError);
          setError('Warehouse not found');
        } else {
          setWarehouse(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load warehouse details');
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, [warehouseId, searchParams]);

  useEffect(() => {
    // Check authentication status only once
    if (!authChecked) {
      if (!user) {
        toast.error("Please log in to book storage");
        navigate('/login', { state: { returnUrl: `/payment?warehouseId=${warehouseId || searchParams.get('warehouseId')}` } });
      }
      setAuthChecked(true);
    }
  }, [user, authChecked, navigate, warehouseId, searchParams]);
  
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
    return warehouse.price * Number(formData.quantity) * Number(formData.duration);
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
              <div class="value">${formData.quantity} metric tons</div>
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

  const handleGoBack = () => {
    navigate(`/warehouse/${warehouse?.id || warehouseId || searchParams.get('warehouseId')}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading warehouse details...</p>
        </div>
      </div>
    );
  }

  if (error || !warehouse) {
    return (
      <ErrorState 
        title="Warehouse Not Found"
        description="Sorry, we couldn't find the warehouse you're looking for."
        buttonText="Browse Available Warehouses"
        buttonUrl="/warehouses"
        icon={<AlertCircle className="mx-auto text-red-500 mb-4" size={64} />}
      />
    );
  }

  // Don't show the auth error state if we're still checking authentication
  // This prevents a flash of the error state during the auth check
  if (!user && authChecked) {
    return (
      <ErrorState 
        title="Authentication Required"
        description="Please log in to continue with your booking."
        buttonText="Log In"
        buttonUrl="/login"
      />
    );
  }

  // Wait until we've checked auth before rendering the main component
  if (!authChecked) {
    return null; // Or a loading spinner
  }

  // Transform warehouse data to match component expectations
  const warehouseForBooking = {
    id: warehouse.id,
    name: warehouse.name,
    location: warehouse.location,
    image: '/lovable-uploads/8eaf55a2-72f8-4628-a7ce-3cabd024f2d7.png', // Default image
    price: `₹${warehouse.price} per metric ton per day`,
    available: warehouse.available,
    features: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock']
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Warehouse
        </Button>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <PaymentHeader isBookingComplete={bookingComplete} />
          
          {!bookingComplete && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={warehouseForBooking.image} 
                  alt={warehouse.name} 
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium text-lg">{warehouse.name}</h3>
                  <p className="text-muted-foreground">{warehouse.location}</p>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 inline-block text-sm">
                <span className="font-medium">Base Price:</span> ₹{warehouse.price} per metric ton per day
              </div>
            </div>
          )}

          {bookingComplete ? (
            <BookingConfirmation 
              bookingDetails={bookingDetails}
              warehouseName={warehouse.name}
              warehouseLocation={warehouse.location}
              quantity={formData.quantity}
              duration={formData.duration}
              startDate={formData.startDate}
              printRef={printRef}
              handlePrint={handlePrint}
              handleDownloadPDF={handleDownloadPDF}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <PaymentForm 
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
                <BookingSummary 
                  warehouse={warehouseForBooking}
                  quantity={formData.quantity}
                  duration={formData.duration}
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

export default Payment;
