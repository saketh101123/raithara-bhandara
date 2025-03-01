
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const NotFoundState = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Warehouse Not Found</h2>
          <p className="mb-6">The warehouse you're looking for doesn't exist or has been removed.</p>
          <Link to="/warehouses">
            <Button>Back to Warehouses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
