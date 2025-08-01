
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Features from "./pages/Features";
import Warehouses from "./pages/Warehouses";
import WarehouseDetails from "./pages/WarehouseDetails";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import LogisticsPayment from "./pages/LogisticsPayment";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/logistics-payment" element={<LogisticsPayment />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
