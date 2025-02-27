
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-primary">Raithara Bhandara</h1>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#warehouses" className="nav-link">Warehouses</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button className="btn-primary">Get Started</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t animate-fade-up">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#features" className="nav-link">Features</a>
              <a href="#warehouses" className="nav-link">Warehouses</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
