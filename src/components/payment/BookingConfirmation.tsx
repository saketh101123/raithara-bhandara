
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Printer, FileText } from 'lucide-react';

interface BookingConfirmationProps {
  bookingDetails: {
    bookingId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    totalAmount: number;
    bookingDate: string;
  };
  warehouseName: string;
  warehouseLocation: string;
  quantity: string;
  duration: string;
  startDate: string;
  printRef: React.RefObject<HTMLDivElement>;
  handlePrint: () => void;
  handleDownloadPDF: () => void;
}

const BookingConfirmation = ({
  bookingDetails,
  warehouseName,
  warehouseLocation,
  quantity,
  duration,
  startDate,
  printRef,
  handlePrint,
  handleDownloadPDF
}: BookingConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <div className="rounded-full bg-green-100 p-3 inline-flex mb-6">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your storage is booked!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for booking with Raithara Bhandara. Your storage space is confirmed at {warehouseName}.
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
              <p className="font-medium">{warehouseName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{warehouseLocation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="font-medium">{quantity} quintals</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{duration} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{startDate}</p>
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
  );
};

export default BookingConfirmation;
