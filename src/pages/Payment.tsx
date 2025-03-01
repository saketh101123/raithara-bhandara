
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { warehousesData } from '@/data/warehousesData';

// Import the newly created components
import PaymentHeader from '@/components/payment/PaymentHeader';
import ErrorState from '@/components/payment/ErrorState';
import PaymentForm from '@/components/payment/PaymentForm';
import BookingSummary from '@/components/payment/BookingSummary';
import BookingConfirmation from '@/components/payment/BookingConfirmation';

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
      <ErrorState 
        title="Warehouse Not Found"
        description="Sorry, we couldn't find the warehouse you're looking for."
        buttonText="Browse Available Warehouses"
        buttonUrl="/warehouses"
        icon={<AlertCircle className="mx-auto text-red-500 mb-4" size={64} />}
      />
    );
  }

  if (!user) {
    return (
      <ErrorState 
        title="Authentication Required"
        description="Please log in to continue with your booking."
        buttonText="Log In"
        buttonUrl="/login"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <PaymentHeader isBookingComplete={bookingComplete} />

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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
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
            
            <div className="lg:col-span-2">
              <BookingSummary 
                warehouse={warehouse}
                quantity={formData.quantity}
                duration={formData.duration}
                getTotalPrice={getTotalPrice}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
