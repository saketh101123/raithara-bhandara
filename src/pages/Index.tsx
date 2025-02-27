
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedWarehouses from '@/components/FeaturedWarehouses';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedWarehouses />
      <Footer />
    </div>
  );
};

export default Index;
