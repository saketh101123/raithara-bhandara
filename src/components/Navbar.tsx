
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Package, DollarSign, Phone, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { label: 'Warehouses', path: '/warehouses', icon: <Package className="h-4 w-4 mr-2" /> },
    { label: 'Pricing', path: '/pricing', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { label: 'Contact', path: '/contact', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  const userNavItems = user
    ? [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
        { label: 'Profile', path: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
        { label: 'Logout', onClick: handleLogout, icon: <LogOut className="h-4 w-4 mr-2" /> },
      ]
    : [
        { label: 'Login', path: '/login', icon: <LogIn className="h-4 w-4 mr-2" /> },
        { label: 'Register', path: '/register', icon: <UserPlus className="h-4 w-4 mr-2" /> },
      ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-background shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-display font-bold text-primary hover:opacity-80 transition-opacity">
            Raithara Bhandara
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {userNavItems.map((item, index) => 
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t">
          <div className="container mx-auto px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border">
              {userNavItems.map((item, index) => 
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMenu();
                      item.onClick?.();
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
