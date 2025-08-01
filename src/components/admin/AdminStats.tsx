
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Warehouse, Calendar, Star, TrendingUp, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Stats {
  totalUsers: number;
  totalWarehouses: number;
  totalBookings: number;
  totalReviews: number;
  averageRating: number;
  recentBookings: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalWarehouses: 0,
    totalBookings: 0,
    totalReviews: 0,
    averageRating: 0,
    recentBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all stats in parallel
        const [
          { count: usersCount },
          { count: warehousesCount },
          { count: bookingsCount },
          { count: reviewsCount },
          { data: avgRating },
          { count: recentBookingsCount },
        ] = await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase.from("warehouses").select("*", { count: "exact", head: true }),
          supabase.from("bookings").select("*", { count: "exact", head: true }),
          supabase.from("reviews").select("*", { count: "exact", head: true }),
          supabase.from("reviews").select("rating"),
          supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .gte("booking_date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        ]);

        const averageRating = avgRating?.length
          ? avgRating.reduce((sum, review) => sum + review.rating, 0) / avgRating.length
          : 0;

        setStats({
          totalUsers: usersCount || 0,
          totalWarehouses: warehousesCount || 0,
          totalBookings: bookingsCount || 0,
          totalReviews: reviewsCount || 0,
          averageRating: Math.round(averageRating * 10) / 10,
          recentBookings: recentBookingsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-blue-600",
    },
    {
      title: "Warehouses",
      value: stats.totalWarehouses,
      icon: Warehouse,
      description: "Available warehouses",
      color: "text-green-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      description: "All time bookings",
      color: "text-orange-600",
    },
    {
      title: "Reviews",
      value: stats.totalReviews,
      icon: Star,
      description: `Avg rating: ${stats.averageRating}`,
      color: "text-yellow-600",
    },
    {
      title: "Recent Bookings",
      value: stats.recentBookings,
      icon: TrendingUp,
      description: "Last 7 days",
      color: "text-purple-600",
    },
    {
      title: "System Status",
      value: "Online",
      icon: Activity,
      description: "All systems operational",
      color: "text-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === "string" ? stat.value : stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
