
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WarehouseManagement from "@/components/admin/WarehouseManagement";
import BookingManagement from "@/components/admin/BookingManagement";
import UserManagement from "@/components/admin/UserManagement";
import ReviewManagement from "@/components/admin/ReviewManagement";
import AdminStats from "@/components/admin/AdminStats";

const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate("/login?returnUrl=/admin");
        return;
      }

      // Check if user email is the admin email
      if (user.email === "saketh1011@gmail.com") {
        setIsAdmin(true);
        console.log("Admin access granted for:", user.email);
      } else {
        console.log("Access denied. User email:", user.email);
        navigate("/");
      }
      
      setCheckingAccess(false);
    };

    if (!isLoading) {
      checkAdminAccess();
    }
  }, [user, isLoading, navigate]);

  if (isLoading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <p className="text-muted-foreground">
              Manage all aspects of the Raithara Bhandara system
            </p>
          </div>

          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="stats">Dashboard</TabsTrigger>
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <AdminStats />
            </TabsContent>

            <TabsContent value="warehouses">
              <WarehouseManagement />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
