
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Printer, FileText } from 'lucide-react';

interface LogisticsBookingConfirmationProps {
  bookingDetails: {
    bookingId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    totalAmount: number;
    bookingDate: string;
  };
  planName: string;
  farmAddress: string;
  cropType: string;
  estimatedWeight: string;
  pickupDate: string;
  printRef: React.RefObject<HTMLDivElement>;
  handlePrint: () => void;
  handleDownloadPDF: () => void;
}

const LogisticsBookingConfirmation = ({
  bookingDetails,
  planName,
  farmAddress,
  cropType,
  estimatedWeight,
  pickupDate,
  printRef,
  handlePrint,
  handleDownloadPDF
}: LogisticsBookingConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <div className="rounded-full bg-green-100 p-3 inline-flex mb-6">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your logistics plan is activated!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for subscribing to Raithara Bhandara logistics services. Your {planName} is now active.
        </p>
        
        <div ref={printRef} className="border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold mb-4 text-gray-700">Subscription Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-medium">{bookingDetails.bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subscription Date</p>
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
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">{planName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Farm Address</p>
              <p className="font-medium">{farmAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Crop Type</p>
              <p className="font-medium">{cropType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Weight</p>
              <p className="font-medium">{estimatedWeight} metric tons</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">First Pickup Date</p>
              <p className="font-medium">{pickupDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Amount</p>
              <p className="font-medium">₹{bookingDetails.totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
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
          <Button variant="outline" onClick={() => navigate('/pricing')}>
            View Other Plans
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-700 text-left space-y-1">
            <li>• Our logistics team will contact you within 24 hours</li>
            <li>• Download our mobile app for real-time tracking</li>
            <li>• Schedule your first pickup through the app or website</li>
            <li>• Get 24/7 support for all your logistics needs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogisticsBookingConfirmation;
