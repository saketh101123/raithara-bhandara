
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary animate-fade-up">
            Connecting Farmers with
            <span className="text-accent"> Smart Storage Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Revolutionizing agricultural storage with IoT-enabled cold storage facilities. 
            Reduce waste, increase profits, and ensure food security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" 
               style={{ animationDelay: '0.4s' }}>
            <Link to="/warehouses">
              <Button className="flex items-center gap-2">
                Find Storage <ChevronRight size={20} />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" className="px-6 py-3 text-primary hover:text-primary/80 transition-colors">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-up" 
               style={{ animationDelay: '0.6s' }}>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">237</h3>
              <p className="text-sm text-foreground/60">Storage Facilities</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">6,76,832</h3>
              <p className="text-sm text-foreground/60">Total Storage Capacity (MT)</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">40%</h3>
              <p className="text-sm text-foreground/60">Potential Waste Reduction</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">₹100Cr+</h3>
              <p className="text-sm text-foreground/60">Potential Annual Savings</p>
            </div>
          </div>

          {/* Added new stats card for farmers benefited */}
          <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <div className="stats-card inline-block mx-auto">
              <h3 className="text-3xl font-bold text-primary">Tens of thousands</h3>
              <p className="text-sm text-foreground/60">Farmers Benefited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
