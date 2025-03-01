
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { warehousesData } from '@/data/warehousesData';
import { toast } from 'sonner';

// Import the newly created components
import WarehouseHeader from '@/components/warehouse/WarehouseHeader';
import WarehouseFeatures from '@/components/warehouse/WarehouseFeatures';
import WarehouseDetailsComponent from '@/components/warehouse/WarehouseDetails';
import WarehouseDescription from '@/components/warehouse/WarehouseDescription';
import BookingCard from '@/components/warehouse/BookingCard';
import LoadingState from '@/components/warehouse/LoadingState';
import NotFoundState from '@/components/warehouse/NotFoundState';

const WarehouseDetails = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      const selectedWarehouse = warehousesData.find(w => w.id === Number(warehouseId));
      setWarehouse(selectedWarehouse);
      setLoading(false);
      
      if (!selectedWarehouse) {
        toast.error("Warehouse not found");
        navigate('/warehouses');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [warehouseId, navigate]);

  if (loading) {
    return <LoadingState />;
  }

  if (!warehouse) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <WarehouseHeader warehouse={warehouse} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <WarehouseFeatures features={warehouse.features} />
              <WarehouseDetailsComponent warehouse={warehouse} />
            </div>

            <WarehouseDescription />
          </div>

          <div className="lg:col-span-1">
            <BookingCard warehouse={warehouse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
