
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Mail, Phone, Calendar, Eye, Shield, Trash2 } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  role: string;
  updated_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          warehouses:warehouse_id (name, location)
        `)
        .eq("user_id", userId)
        .order("booking_date", { ascending: false });

      if (error) throw error;
      setUserBookings(data || []);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setUserBookings([]);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSearch = !searchTerm || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewUser = async (user: UserProfile) => {
    setSelectedUser(user);
    await fetchUserBookings(user.id);
  };

  if (loading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts and roles</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.first_name} {user.last_name}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>Complete user information and booking history</DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold">Name</p>
                              <p>{selectedUser.first_name} {selectedUser.last_name}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p>{selectedUser.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Phone</p>
                              <p>{selectedUser.phone_number || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Role</p>
                              <div className="flex items-center gap-2">
                                <Badge className={getRoleColor(selectedUser.role)}>
                                  {selectedUser.role}
                                </Badge>
                                {selectedUser.role !== "admin" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateUserRole(selectedUser.id, "admin")}
                                  >
                                    Make Admin
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Booking History ({userBookings.length})</h4>
                            {userBookings.length > 0 ? (
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {userBookings.map((booking) => (
                                  <div key={booking.id} className="p-2 border rounded text-sm">
                                    <div className="flex justify-between">
                                      <span>{booking.warehouses?.name}</span>
                                      <span>₹{booking.total_amount.toLocaleString()}</span>
                                    </div>
                                    <div className="text-muted-foreground">
                                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No bookings found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {user.role !== "admin" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateUserRole(user.id, "admin")}
                    >
                      <Shield className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone_number && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone_number}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(user.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No users found matching your criteria
        </div>
      )}
    </div>
  );
};

export default UserManagement;
