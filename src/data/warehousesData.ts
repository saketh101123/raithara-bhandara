
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

// Cold storage images for different warehouses
const coldStorageImages = [
  '/lovable-uploads/8eaf55a2-72f8-4628-a7ce-3cabd024f2d7.png', // Arctic Cold Storage
  '/lovable-uploads/171ac39c-990c-44b4-92cb-1d8e694c2679.png', // Himalayan Ice Vault
  '/lovable-uploads/25625be3-3b04-4276-8b33-e7e0dbecdc85.png', // Frost Guardian Warehouse
  '/lovable-uploads/304c5e42-7528-4093-b938-b079280e9a2b.png', // ChillMax Storage Solutions
  '/lovable-uploads/9019d7ca-efac-4947-b1de-94627f5a9b0e.png', // Polar Storage Facility
  '/lovable-uploads/e673a140-973c-4601-9768-33e696383838.png', // IceCap Cold Storage
];

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
    return warehouses?.map((warehouse, index) => ({
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      rating: 4.5, // Default rating - could be calculated from reviews
      capacity: '5,000 metric tons', // Default capacity - could be added to database
      price: `₹${warehouse.price} per metric ton per day`,
      distance: '0 km', // Default distance - could be calculated based on user location
      image: coldStorageImages[index % coldStorageImages.length], // Assign different images cyclically
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
