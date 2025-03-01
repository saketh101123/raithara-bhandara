
import React from 'react';
import Navbar from '@/components/Navbar';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
