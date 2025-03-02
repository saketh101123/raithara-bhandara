
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import WarehouseHeader from '@/components/warehouse/WarehouseHeader';
import WarehouseDescription from '@/components/warehouse/WarehouseDescription';
import WarehouseFeatures from '@/components/warehouse/WarehouseFeatures';
import BookingCard from '@/components/warehouse/BookingCard';
import WarehouseReviews from '@/components/reviews/WarehouseReviews';
import LoadingState from '@/components/warehouse/LoadingState';
import NotFoundState from '@/components/warehouse/NotFoundState';
import { warehousesData } from '@/data/warehousesData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const WarehouseDetails = () => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [warehouse, setWarehouse] = useState<any>(null);

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      setIsLoading(true);
      try {
        // Normally we would fetch from an API endpoint here
        // Simulate API call with a timeout
        setTimeout(() => {
          const foundWarehouse = warehousesData.find(w => w.id === parseInt(warehouseId || '0'));
          setWarehouse(foundWarehouse || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching warehouse details:', error);
        setIsLoading(false);
      }
    };

    fetchWarehouseDetails();
  }, [warehouseId]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please log in to book a storage unit");
      navigate('/login', { state: { returnUrl: `/warehouse/${warehouseId}` } });
      return;
    }
    
    // Fixed route to match the route defined in App.tsx
    navigate(`/payment/${warehouseId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!warehouse) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <WarehouseHeader 
            warehouseName={warehouse.name} 
            location={warehouse.location} 
            rating={warehouse.rating} 
            reviewCount={5} 
            imageUrl={warehouse.image} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <WarehouseDescription />
              
              <WarehouseFeatures 
                features={warehouse.features} 
              />
              
              <WarehouseReviews 
                warehouseId={warehouse.id} 
              />
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingCard 
                  warehousePrice={warehouse.price}
                  warehouseAvailability={warehouse.available ? 'Available Now' : 'Currently Full'} 
                  onBookNow={handleBookNow} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
