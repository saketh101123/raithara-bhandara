
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Filter, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { fetchWarehousesData, type WarehouseData } from '@/data/warehousesData';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<WarehouseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        const data = await fetchWarehousesData();
        setWarehouses(data);
        setFilteredWarehouses(data);
      } catch (error) {
        console.error('Error loading warehouses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWarehouses();
  }, []);

  useEffect(() => {
    let filtered = warehouses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(warehouse =>
        warehouse.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(warehouse => warehouse.available);
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(warehouse => !warehouse.available);
    }

    setFilteredWarehouses(filtered);
  }, [searchTerm, locationFilter, availabilityFilter, warehouses]);

  // Get unique locations for filter
  const uniqueLocations = Array.from(new Set(warehouses.map(w => w.location)));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading warehouses...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Find the Perfect Storage
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Browse our network of verified cold storage facilities across Karnataka
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search warehouses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Warehouses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Fully Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredWarehouses.length} of {warehouses.length} warehouses
            </p>
          </div>

          {/* Warehouse Grid */}
          {filteredWarehouses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No warehouses found matching your criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setAvailabilityFilter('');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWarehouses.map((warehouse) => (
                <div 
                  key={warehouse.id}
                  className="bg-card rounded-xl border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={warehouse.image} 
                      alt={warehouse.name}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      warehouse.available 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {warehouse.available ? 'Available' : 'Fully Booked'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{warehouse.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{warehouse.location}</span>
                      <span className="ml-auto">{warehouse.distance}</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Capacity:</span>
                        <span className="font-medium">{warehouse.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Price:</span>
                        <span className="font-medium text-primary">{warehouse.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {warehouse.features.slice(0, 2).map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {warehouse.features.length > 2 && (
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          +{warehouse.features.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/warehouse/${warehouse.id}`}>
                      <Button className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Warehouses;
