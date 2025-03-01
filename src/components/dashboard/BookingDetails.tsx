
import React from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Printer, FileDown, CheckCircle, Calendar, MapPin, Package, PhoneCall, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BookingDetailsProps {
  booking: {
    id: string;
    warehouse_id: number;
    warehouse_name: string;
    location: string;
    start_date: string;
    end_date: string;
    quantity: number;
    duration: number;
    status: 'active' | 'completed' | 'cancelled';
    total_amount: number;
    booking_date: string;
    user: {
      name: string;
      email: string;
      phone: string;
    };
  } | null;
  open: boolean;
  onClose: () => void;
}

const BookingDetails = ({ booking, open, onClose }: BookingDetailsProps) => {
  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Could not open print window. Please check your popup settings.");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Receipt - ${booking.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #166534; }
            .title { font-size: 20px; margin: 10px 0; }
            .details { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            .row { display: flex; margin-bottom: 10px; }
            .label { font-weight: bold; width: 200px; }
            .value { flex: 1; }
            .status { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
            .status-active { background-color: #dcfce7; color: #166534; }
            .status-completed { background-color: #dbeafe; color: #1e40af; }
            .status-cancelled { background-color: #fee2e2; color: #b91c1c; }
            .footer { margin-top: 40px; text-align: center; font-size: 14px; color: #666; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Raithara Bhandara</div>
            <div class="title">Booking Receipt</div>
            <div style="margin-top: 5px;">
              <span class="status status-${booking.status}">
                ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
          <div class="details">
            <div class="row">
              <div class="label">Booking ID:</div>
              <div class="value">${booking.id}</div>
            </div>
            <div class="row">
              <div class="label">Customer Name:</div>
              <div class="value">${booking.user.name}</div>
            </div>
            <div class="row">
              <div class="label">Email:</div>
              <div class="value">${booking.user.email}</div>
            </div>
            <div class="row">
              <div class="label">Phone:</div>
              <div class="value">${booking.user.phone}</div>
            </div>
            <div class="row">
              <div class="label">Warehouse:</div>
              <div class="value">${booking.warehouse_name}</div>
            </div>
            <div class="row">
              <div class="label">Location:</div>
              <div class="value">${booking.location}</div>
            </div>
            <div class="row">
              <div class="label">Quantity:</div>
              <div class="value">${booking.quantity} quintals</div>
            </div>
            <div class="row">
              <div class="label">Duration:</div>
              <div class="value">${booking.duration} days</div>
            </div>
            <div class="row">
              <div class="label">Start Date:</div>
              <div class="value">${formatDate(booking.start_date)}</div>
            </div>
            <div class="row">
              <div class="label">End Date:</div>
              <div class="value">${formatDate(booking.end_date)}</div>
            </div>
            <div class="row">
              <div class="label">Total Amount:</div>
              <div class="value">₹${booking.total_amount.toLocaleString()}</div>
            </div>
            <div class="row">
              <div class="label">Booking Date:</div>
              <div class="value">${formatDate(booking.booking_date)}</div>
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
    toast.info("PDF download functionality would be implemented with a library like jsPDF");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[booking.status]}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </DialogTitle>
          <DialogDescription>
            Booking ID: {booking.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Warehouse</h3>
              <p className="text-sm">{booking.warehouse_name}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {booking.location}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Duration</h3>
              <div className="flex items-center text-sm">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{booking.duration} days</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Quantity</h3>
              <div className="flex items-center text-sm">
                <Package className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{booking.quantity} quintals</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Total Amount</h3>
              <p className="text-sm font-semibold">₹{booking.total_amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Paid on {formatDate(booking.booking_date)}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Customer Information</h3>
            <div className="space-y-2">
              <p className="text-sm">{booking.user.name}</p>
              <div className="flex items-center text-sm">
                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{booking.user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <PhoneCall className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{booking.user.phone}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <FileDown className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetails;
