
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { MapPin, Star, Search, FilterX, Calendar, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const warehousesData = [
  {
    id: 1,
    name: 'Bangalore Central Storage',
    location: 'Bangalore Rural',
    rating: 4.8,
    capacity: '5000 MT',
    price: '₹35/quintal/day',
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    available: true,
    features: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock']
  },
  {
    id: 2,
    name: 'Mysore Cold Storage',
    location: 'Mysore',
    rating: 4.7,
    capacity: '3000 MT',
    price: '₹32/quintal/day',
    distance: '45 km',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    available: true,
    features: ['Temperature Control', 'Pest Control', 'Power Backup', 'Quality Testing']
  },
  {
    id: 3,
    name: 'Hassan Agri Store',
    location: 'Hassan',
    rating: 4.9,
    capacity: '4000 MT',
    price: '₹30/quintal/day',
    distance: '80 km',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
    available: true,
    features: ['Temperature Control', 'Humidity Control', 'Transport Service', 'Market Linkage']
  },
  {
    id: 4,
    name: 'Tumkur Farmer Storage',
    location: 'Tumkur',
    rating: 4.6,
    capacity: '2000 MT',
    price: '₹28/quintal/day',
    distance: '35 km',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    available: true,
    features: ['Temperature Control', 'Sorting Facility', 'Packaging', 'Internet Connectivity']
  },
  {
    id: 5,
    name: 'Mandya Agricultural Warehouse',
    location: 'Mandya',
    rating: 4.5,
    capacity: '3500 MT',
    price: '₹31/quintal/day',
    distance: '65 km',
    image: 'https://images.unsplash.com/photo-1512467627024-7a5e9c576d24?auto=format&fit=crop&w=800&q=80',
    available: false,
    features: ['Temperature Control', 'Humidity Control', 'Grading', 'Insurance Coverage']
  },
  {
    id: 6,
    name: 'Kolar Gold Storage',
    location: 'Kolar',
    rating: 4.8,
    capacity: '2500 MT',
    price: '₹33/quintal/day',
    distance: '50 km',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    available: true,
    features: ['Temperature Control', 'Quality Certification', 'Export Facility', 'Loan Against Storage']
  }
];

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
                    <span>{warehouse.location} ({warehouse.distance})</span>
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
                    {warehouse.available ? (
                      <Link to={`/payment/${warehouse.id}`}>
                        <Button size="sm">Book Storage</Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="outline" disabled>Unavailable</Button>
                    )}
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
