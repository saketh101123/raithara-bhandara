
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { MapPin, Star, Search, FilterX, Calendar, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { warehousesData } from '@/data/warehousesData';

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehousesData);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = warehousesData.filter(warehouse => 
      (warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (showOnlyAvailable ? warehouse.available : true)
    );
    setFilteredWarehouses(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setShowOnlyAvailable(false);
    setFilteredWarehouses(warehousesData);
  };

  const handleAvailabilityToggle = () => {
    const newState = !showOnlyAvailable;
    setShowOnlyAvailable(newState);
    
    if (newState) {
      setFilteredWarehouses(warehousesData.filter(w => w.available));
    } else {
      setFilteredWarehouses(warehousesData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-display font-bold text-primary mb-8">Find Storage Facilities</h1>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" size={18} />
                <Input 
                  type="text"
                  placeholder="Search by location or warehouse name" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Search</Button>
              <Button type="button" variant="outline" onClick={handleReset} className="flex items-center gap-2">
                <FilterX size={16} /> Reset
              </Button>
            </div>
          </form>
          
          <div className="mt-4 flex items-center">
            <Button 
              type="button" 
              variant={showOnlyAvailable ? "default" : "outline"} 
              className="text-sm"
              onClick={handleAvailabilityToggle}
            >
              {showOnlyAvailable ? "Showing Available Only" : "Show All Warehouses"}
            </Button>
          </div>
        </div>

        {filteredWarehouses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70">No warehouses found matching your criteria.</p>
            <Button variant="outline" onClick={handleReset} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWarehouses.map((warehouse) => (
              <Card key={warehouse.id} className={`overflow-hidden h-full hover:shadow-md transition-shadow ${!warehouse.available ? 'opacity-70' : ''}`}>
                <div className="relative h-48">
                  <img 
                    src={warehouse.image} 
                    alt={warehouse.name}
                    className="w-full h-full object-cover"
                  />
                  {!warehouse.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                        Fully Booked
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{warehouse.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-foreground/70 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{warehouse.location} ({warehouse.distance} from Bangalore)</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-foreground/70 mb-4">
                    <Truck className="w-4 h-4 mr-1" />
                    <span>Capacity: {warehouse.capacity}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {warehouse.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {warehouse.features.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        +{warehouse.features.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-primary font-semibold">{warehouse.price}</div>
                    <Link to={`/warehouse/${warehouse.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Warehouses;
