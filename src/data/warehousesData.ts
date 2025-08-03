
import { supabase } from '@/integrations/supabase/client';

export interface WarehouseData {
  id: number;
  name: string;
  location: string;
  rating: number;
  capacity: string;
  price: string;
  distance: string;
  image: string;
  available: boolean;
  features: string[];
}

// Fetch warehouses from database
export const fetchWarehousesData = async (): Promise<WarehouseData[]> => {
  try {
    const { data: warehouses, error } = await supabase
      .from('warehouses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching warehouses:', error);
      return [];
    }

    // Transform database data to match the expected format
    return warehouses?.map(warehouse => ({
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      rating: 4.5, // Default rating - could be calculated from reviews
      capacity: '5,000 metric tons', // Default capacity - could be added to database
      price: `₹${warehouse.price} per metric ton per day`,
      distance: '0 km', // Default distance - could be calculated based on user location
      image: '/lovable-uploads/8eaf55a2-72f8-4628-a7ce-3cabd024f2d7.png', // Default image
      available: warehouse.available,
      features: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock'] // Default features
    })) || [];
  } catch (error) {
    console.error('Error in fetchWarehousesData:', error);
    return [];
  }
};

// For backwards compatibility - this will be empty array, components should use fetchWarehousesData
export const warehousesData: WarehouseData[] = [];
