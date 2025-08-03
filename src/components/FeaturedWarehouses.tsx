
import { useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchWarehousesData, type WarehouseData } from '@/data/warehousesData';

const FeaturedWarehouses = () => {
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        const data = await fetchWarehousesData();
        // Get first 3 warehouses for featured section
        setWarehouses(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured warehouses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWarehouses();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-green-50" id="warehouses">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading warehouses...</div>
        </div>
      </section>
    );
  }

  if (warehouses.length === 0) {
    return (
      <section className="py-20 bg-green-50" id="warehouses">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Featured Storage Facilities
          </h2>
          <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            No warehouses available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-green-50" id="warehouses">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Featured Storage Facilities
        </h2>
        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Discover top-rated cold storage facilities near you with real-time availability and competitive pricing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {warehouses.map((warehouse, index) => (
            <div key={warehouse.id} 
                 className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scale-up"
                 style={{ animationDelay: `${index * 0.1 + 0.1}s` }}>
              <div className="relative h-48">
                <img 
                  src={warehouse.image} 
                  alt={warehouse.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{warehouse.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-foreground/70 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{warehouse.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Capacity: {warehouse.capacity}</span>
                  <Link to={`/warehouse/${warehouse.id}`}>
                    <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg 
                                    hover:bg-primary/20 transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWarehouses;
