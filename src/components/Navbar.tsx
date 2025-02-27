
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-primary">Raithara Bhandara</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className={`nav-link ${isActive('/features') ? 'text-primary' : ''}`}>
              Features
            </Link>
            <Link to="/warehouses" className={`nav-link ${isActive('/warehouses') ? 'text-primary' : ''}`}>
              Warehouses
            </Link>
            <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'text-primary' : ''}`}>
              Pricing
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-primary' : ''}`}>
              Contact
            </Link>
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
              <Link 
                to="/features" 
                className={`nav-link ${isActive('/features') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/warehouses" 
                className={`nav-link ${isActive('/warehouses') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Warehouses
              </Link>
              <Link 
                to="/pricing" 
                className={`nav-link ${isActive('/pricing') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
