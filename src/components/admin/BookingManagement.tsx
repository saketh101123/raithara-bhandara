
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, User, Warehouse, Clock, DollarSign, Eye, Trash2 } from "lucide-react";

interface Booking {
  id: string;
  user_id: string;
  warehouse_id: number;
  start_date: string;
  end_date: string;
  quantity: number;
  duration: number;
  total_amount: number;
  status: string;
  booking_date: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  warehouses?: {
    name: string;
    location: string;
  } | null;
}

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          user_id,
          warehouse_id,
          start_date,
          end_date,
          quantity,
          duration,
          total_amount,
          status,
          booking_date,
          profiles (first_name, last_name, email),
          warehouses (name, location)
        `)
        .order("booking_date", { ascending: false });

      if (error) throw error;
      
      // Type assertion to handle the data properly
      const typedBookings = (data || []).map(booking => ({
        ...booking,
        profiles: booking.profiles as { first_name: string; last_name: string; email: string } | null,
        warehouses: booking.warehouses as { name: string; location: string } | null
      }));
      
      setBookings(typedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking status updated to ${newStatus}`,
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch = !searchTerm || 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.warehouses?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-muted-foreground">Manage customer bookings</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by booking ID, email, or warehouse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Booking #{booking.id}</CardTitle>
                  <CardDescription>
                    Booked on {new Date(booking.booking_date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>Complete booking information</DialogDescription>
                      </DialogHeader>
                      {selectedBooking && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold">Customer</p>
                              <p>{selectedBooking.profiles?.first_name} {selectedBooking.profiles?.last_name}</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.profiles?.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Warehouse</p>
                              <p>{selectedBooking.warehouses?.name || "Unknown Warehouse"}</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.warehouses?.location}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Booking Period</p>
                              <p>{new Date(selectedBooking.start_date).toLocaleDateString()} - {new Date(selectedBooking.end_date).toLocaleDateString()}</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.duration} days</p>
                            </div>
                            <div>
                              <p className="font-semibold">Quantity & Amount</p>
                              <p>{selectedBooking.quantity} units</p>
                              <p className="text-sm text-muted-foreground">₹{selectedBooking.total_amount.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                              disabled={selectedBooking.status === "confirmed"}
                            >
                              Confirm
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                              disabled={selectedBooking.status === "completed"}
                            >
                              Mark Complete
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                              disabled={selectedBooking.status === "cancelled"}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this booking? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteBooking(booking.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.profiles?.first_name} {booking.profiles?.last_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.warehouses?.name || "Unknown"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>₹{booking.total_amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No bookings found matching your criteria
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
