
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { warehousesData } from '@/data/warehousesData';

import WarehouseHeader from '@/components/warehouse/WarehouseHeader';
import WarehouseDescription from '@/components/warehouse/WarehouseDescription';
import WarehouseFeatures from '@/components/warehouse/WarehouseFeatures';
import BookingCard from '@/components/warehouse/BookingCard';
import LoadingState from '@/components/warehouse/LoadingState';
import NotFoundState from '@/components/warehouse/NotFoundState';
import WarehouseReviews from '@/components/reviews/WarehouseReviews';

const WarehouseDetails = () => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const warehouse = warehousesData.find(w => w.id === Number(warehouseId));

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please log in to book storage");
      navigate('/login', { state: { returnUrl: `/warehouse/${warehouseId}` } });
      return;
    }
    
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
      
      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <WarehouseHeader 
              name={warehouse.name} 
              location={warehouse.location} 
              rating={warehouse.rating} 
              reviewCount={warehouse.reviewCount} 
              imageUrl={warehouse.imageUrl} 
            />
            
            <WarehouseDescription description={warehouse.description} />
            
            <WarehouseFeatures features={warehouse.features} />
            
            <WarehouseReviews warehouseId={warehouse.id} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard 
                price={warehouse.price} 
                availability={warehouse.availability} 
                onBookNow={handleBookNow} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WarehouseDetails;
