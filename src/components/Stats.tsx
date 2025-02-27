
import { Thermometer, Users, TrendingUp, Clock } from 'lucide-react';

const Stats = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
          Why Choose Raithara Bhandara?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="stats-card animate-scale-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Monitoring</h3>
            </div>
            <p className="text-foreground/70">
              Real-time temperature and humidity tracking for optimal storage conditions
            </p>
          </div>

          <div className="stats-card animate-scale-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Easy Booking</h3>
            </div>
            <p className="text-foreground/70">
              Simple and quick process to find and reserve storage space
            </p>
          </div>

          <div className="stats-card animate-scale-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
            </div>
            <p className="text-foreground/70">
              Detailed insights and reports for better decision making
            </p>
          </div>

          <div className="stats-card animate-scale-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
            </div>
            <p className="text-foreground/70">
              Round-the-clock assistance in multiple languages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
