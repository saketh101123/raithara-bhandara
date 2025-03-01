
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  icon?: React.ReactNode;
}

const ErrorState = ({ 
  title, 
  description, 
  buttonText, 
  buttonUrl,
  icon = <AlertCircle className="mx-auto text-yellow-500 mb-4" size={64} />
}: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 text-center">
        {icon}
        <h1 className="text-4xl font-display font-bold text-primary mb-4">{title}</h1>
        <p className="text-lg text-foreground/80 mb-8">
          {description}
        </p>
        <Button onClick={() => navigate(buttonUrl)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
