
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WarehouseHeader from '@/components/warehouse/WarehouseHeader';
import WarehouseDetailsComponent from '@/components/warehouse/WarehouseDetails';
import BookingCard from '@/components/warehouse/BookingCard';
import WarehouseFeatures from '@/components/warehouse/WarehouseFeatures';
import WarehouseDescription from '@/components/warehouse/WarehouseDescription';
import WarehouseReviews from '@/components/reviews/WarehouseReviews';
import LoadingState from '@/components/warehouse/LoadingState';
import NotFoundState from '@/components/warehouse/NotFoundState';

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

const WarehouseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
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
  }, [id]);

  const handleBookNow = () => {
    if (warehouse) {
      navigate(`/payment?warehouseId=${warehouse.id}&price=${warehouse.price}`);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !warehouse) {
    return <NotFoundState />;
  }

  // Transform warehouse data to match component expectations
  const warehouseData = {
    capacity: '5,000 metric tons', // Default capacity - could be added to database
    price: `₹${warehouse.price} per metric ton per day`,
    available: warehouse.available
  };

  const features = [
    'Temperature Control (-5° to 5°C)',
    'Humidity Control (65-70%)',
    '24/7 Security & Monitoring',
    'Loading & Unloading Dock',
    'Quality Testing Lab',
    'Power Backup Generator',
    'Fire Safety Systems',
    'Pest Control Management'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <WarehouseHeader
              warehouseName={warehouse.name}
              location={warehouse.location}
              rating={4.5}
              reviewCount={127}
              imageUrl="/lovable-uploads/8eaf55a2-72f8-4628-a7ce-3cabd024f2d7.png"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              <WarehouseDetailsComponent warehouse={warehouseData} />
              <WarehouseFeatures features={features} />
              <WarehouseDescription 
                description={warehouse.description || 'Modern cold storage facility with state-of-the-art temperature and humidity control systems. Perfect for storing agricultural produce, maintaining freshness and quality.'}
              />
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingCard
                  warehousePrice={warehouseData.price}
                  warehouseAvailability={warehouse.available ? 'Available Now' : 'Fully Booked'}
                  onBookNow={handleBookNow}
                />
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <WarehouseReviews warehouseId={warehouse.id} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WarehouseDetails;
