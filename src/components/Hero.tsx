
import { ChevronRight } from 'lucide-react';

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
            <button className="btn-primary flex items-center gap-2">
              Find Storage <ChevronRight size={20} />
            </button>
            <button className="px-6 py-3 text-primary hover:text-primary/80 transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-up" 
               style={{ animationDelay: '0.6s' }}>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">1000+</h3>
              <p className="text-sm text-foreground/60">Storage Facilities</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">50K+</h3>
              <p className="text-sm text-foreground/60">Farmers Served</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">40%</h3>
              <p className="text-sm text-foreground/60">Waste Reduction</p>
            </div>
            <div className="stats-card">
              <h3 className="text-3xl font-bold text-primary">₹100Cr+</h3>
              <p className="text-sm text-foreground/60">Saved Annually</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
