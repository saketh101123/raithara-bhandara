
import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {location.pathname !== '/' && (
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                className="mr-2"
              >
                Back
              </Button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-display font-bold text-primary">Raithara Bhandara</h1>
            </Link>
          </div>

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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User size={16} />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2 cursor-pointer">
                    <User size={16} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="gap-2 cursor-pointer">
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
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
              
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    className="gap-2 w-full justify-start"
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={16} />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 w-full justify-start"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
