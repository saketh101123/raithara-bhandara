
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Calendar, Truck, CheckCircle, ThermometerSnowflake, BadgePercent } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { warehousesData } from '@/data/warehousesData';
import { toast } from 'sonner';

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

  const handleBooking = () => {
    if (warehouse && warehouse.available) {
      navigate(`/payment/${warehouseId}`);
    } else {
      toast.error("This facility is currently unavailable for booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!warehouse) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Warehouse Not Found</h2>
            <p className="mb-6">The warehouse you're looking for doesn't exist or has been removed.</p>
            <Link to="/warehouses">
              <Button>Back to Warehouses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link to="/warehouses" className="text-primary hover:underline flex items-center gap-1">
            ← Back to Warehouses
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
              <img 
                src={warehouse.image} 
                alt={warehouse.name}
                className="w-full h-full object-cover"
              />
              {!warehouse.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-md font-medium">
                    Fully Booked
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-primary">{warehouse.name}</h1>
                  <div className="flex items-center mt-2 text-foreground/70">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{warehouse.location} ({warehouse.distance})</span>
                  </div>
                </div>
                <div className="flex items-center bg-primary/5 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold text-lg">{warehouse.rating}</span>
                  <span className="text-foreground/60 ml-1">/5</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <ThermometerSnowflake className="w-5 h-5 mr-2 text-primary" />
                    Facility Features
                  </h3>
                  <ul className="space-y-3">
                    {warehouse.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-primary" />
                    Storage Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-foreground/70">Capacity</span>
                      <span className="font-medium">{warehouse.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-foreground/70">Price</span>
                      <span className="font-medium text-primary">{warehouse.price}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-foreground/70">Availability</span>
                      <span className={`font-medium ${warehouse.available ? 'text-green-600' : 'text-red-600'}`}>
                        {warehouse.available ? 'Available Now' : 'Fully Booked'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-foreground/70">Minimum Duration</span>
                      <span className="font-medium">1 Month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About This Facility</h3>
                <p className="mb-4">
                  This state-of-the-art cold storage facility provides optimal conditions for preserving your agricultural produce. 
                  Equipped with advanced temperature and humidity control systems, it ensures that your crops maintain their freshness and quality for extended periods.
                </p>
                <p>
                  The facility offers flexible storage options, 24/7 security, and easy access for loading and unloading. 
                  Our experienced staff is dedicated to providing excellent service and ensuring your produce is stored in ideal conditions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Book This Storage</h3>
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-1">{warehouse.price}</div>
                  <div className="text-sm text-foreground/60">per quintal per day</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Immediate Availability</p>
                      <p className="text-sm text-foreground/60">Book now to secure your storage</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BadgePercent className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">10% discount on 3+ months</p>
                      <p className="text-sm text-foreground/60">Long-term benefits available</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full text-base py-6" 
                  disabled={!warehouse.available}
                  onClick={handleBooking}
                >
                  {warehouse.available ? 'Book Storage Now' : 'Currently Unavailable'}
                </Button>
                
                {!warehouse.available && (
                  <p className="text-sm text-center mt-3 text-foreground/60">
                    This facility is currently fully booked. Please check back later or explore other options.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
