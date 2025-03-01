
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import BookingCard from '@/components/dashboard/BookingCard';
import BookingDetails from '@/components/dashboard/BookingDetails';
import BookingFilters from '@/components/dashboard/BookingFilters';

interface Booking {
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
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your dashboard");
      navigate('/login', { state: { returnUrl: '/dashboard' } });
      return;
    }
    
    fetchBookings();
  }, [user, navigate]);

  useEffect(() => {
    if (bookings.length) {
      applyFilters();
    }
  }, [bookings, statusFilter, dateRangeFilter]);

  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          warehouse_id,
          start_date,
          end_date,
          quantity,
          duration,
          status,
          total_amount,
          booking_date,
          warehouses:warehouse_id (name, location)
        `)
        .eq('user_id', user.id)
        .order('booking_date', { ascending: false });
      
      if (error) throw error;
      
      // Format the data to match our Booking interface
      const formattedBookings: Booking[] = (data || []).map((booking: any) => ({
        id: booking.id,
        warehouse_id: booking.warehouse_id,
        warehouse_name: booking.warehouses?.name || 'Unknown Warehouse',
        location: booking.warehouses?.location || 'Unknown Location',
        start_date: booking.start_date,
        end_date: booking.end_date,
        quantity: booking.quantity,
        duration: booking.duration,
        status: booking.status || 'active',
        total_amount: booking.total_amount,
        booking_date: booking.booking_date,
        user: {
          name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`,
          email: user.email || '',
          phone: user.user_metadata?.phone_number || ''
        }
      }));
      
      setBookings(formattedBookings);
      setFilteredBookings(formattedBookings);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    // Apply date range filter
    if (dateRangeFilter.from) {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.booking_date);
        if (dateRangeFilter.from && dateRangeFilter.to) {
          return bookingDate >= dateRangeFilter.from && bookingDate <= dateRangeFilter.to;
        }
        return bookingDate >= (dateRangeFilter.from as Date);
      });
    }
    
    setFilteredBookings(filtered);
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setDateRangeFilter({ from: undefined, to: undefined });
  };

  const handleViewDetails = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // For demo purposes only - generates mock data if no real bookings exist
  const generateMockBookings = () => {
    if (!user) return;
    
    const statuses: ('active' | 'completed' | 'cancelled')[] = ['active', 'completed', 'cancelled'];
    const mockBookings: Booking[] = Array.from({ length: 5 }).map((_, index) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (index * 15));
      
      const duration = 30;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration);
      
      return {
        id: `B${1000 + index}`,
        warehouse_id: 1 + (index % 3),
        warehouse_name: `Warehouse ${1 + (index % 3)}`,
        location: ['Bengaluru', 'Mysuru', 'Mangaluru'][index % 3],
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        quantity: 10 + (index * 5),
        duration: duration,
        status: statuses[index % 3],
        total_amount: (10 + (index * 5)) * 100 * duration,
        booking_date: new Date(startDate.getTime() - (24 * 60 * 60 * 1000)).toISOString(),
        user: {
          name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`,
          email: user.email || '',
          phone: user.user_metadata?.phone_number || ''
        }
      };
    });
    
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
    setLoading(false);
    toast.success("Mock bookings generated for demo");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-display font-bold text-primary">My Bookings</h1>
            
            {bookings.length === 0 && !loading && (
              <button 
                onClick={generateMockBookings} 
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Generate Demo Data
              </button>
            )}
          </div>
          
          {bookings.length > 0 && (
            <BookingFilters
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateRangeFilter={dateRangeFilter}
              onDateRangeFilterChange={setDateRangeFilter}
              onResetFilters={handleResetFilters}
            />
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  id={booking.id}
                  warehouseName={booking.warehouse_name}
                  location={booking.location}
                  startDate={booking.start_date}
                  endDate={booking.end_date}
                  quantity={booking.quantity}
                  status={booking.status}
                  totalAmount={booking.total_amount}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              {bookings.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-2">No bookings match your filters</h3>
                  <p className="text-muted-foreground mb-4">Try changing your filter criteria</p>
                  <button 
                    onClick={handleResetFilters} 
                    className="text-primary hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-2">You haven't made any bookings yet</h3>
                  <p className="text-muted-foreground mb-4">Once you book a storage unit, it will appear here</p>
                  <button 
                    onClick={() => navigate('/warehouses')} 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Browse Warehouses
                  </button>
                </div>
              )}
            </div>
          )}
          
          <BookingDetails
            booking={selectedBooking}
            open={isModalOpen}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
