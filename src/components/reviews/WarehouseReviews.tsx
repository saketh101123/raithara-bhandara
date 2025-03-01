
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { useAuth } from '@/contexts/AuthContext';

interface Review {
  id: number;
  user_id: string;
  warehouse_id: number;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface WarehouseReviewsProps {
  warehouseId: number;
}

const WarehouseReviews = ({ warehouseId }: WarehouseReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .eq('warehouse_id', warehouseId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setReviews(data || []);
      
      // Check if the current user has already submitted a review
      if (user) {
        setUserHasReviewed(data?.some(review => review.user_id === user.id) || false);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [warehouseId, user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCustomerName = (review: Review) => {
    if (review.profiles?.first_name && review.profiles?.last_name) {
      return `${review.profiles.first_name} ${review.profiles.last_name}`;
    }
    return 'Anonymous';
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {user && !userHasReviewed && (
        <div className="mb-8">
          <ReviewForm warehouseId={warehouseId} onReviewSubmitted={fetchReviews} />
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              customerName={getCustomerName(review)}
              rating={review.rating}
              comment={review.comment}
              date={formatDate(review.created_at)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No reviews yet. Be the first to review this warehouse!</p>
        </div>
      )}
    </div>
  );
};

export default WarehouseReviews;
