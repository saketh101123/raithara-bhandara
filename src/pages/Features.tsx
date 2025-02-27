
import Navbar from '@/components/Navbar';
import { Check, Shield, Thermometer, Clock, ArrowRight, Cpu, Cloud, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-display font-bold text-primary mb-6">Our Features</h1>
          <p className="text-lg text-foreground/80 mb-8">
            Raithara Bhandara offers cutting-edge storage solutions with IoT-enabled monitoring and real-time tracking to ensure your produce stays fresh and profitable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/warehouses" className="w-full">
              <Button className="w-full">Find Storage Near You <ArrowRight className="ml-2" size={16} /></Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Thermometer className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Temperature Control</h3>
            <p className="text-foreground/70">
              IoT-enabled precise temperature control with real-time monitoring and alerts to maintain optimal conditions for your produce.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
            <p className="text-foreground/70">
              24/7 security with surveillance cameras and controlled access to ensure your harvest is safe and protected.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Duration</h3>
            <p className="text-foreground/70">
              Rent storage for as short as one day or as long as you need with easy extension options and no hidden fees.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Cpu className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Inventory</h3>
            <p className="text-foreground/70">
              Track your inventory with our smart management system, providing real-time updates on stock levels and conditions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Cloud className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mobile Access</h3>
            <p className="text-foreground/70">
              Manage your storage from anywhere with our mobile app. Get notifications, check conditions, and make payments on the go.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BarChart className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
            <p className="text-foreground/70">
              Access to market data and price trends to help you make informed decisions about when to sell your produce.
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="mb-6">Join thousands of farmers who have already increased their profits through our storage solutions.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/warehouses">
              <Button>Find Storage</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
