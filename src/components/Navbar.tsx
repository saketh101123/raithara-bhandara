
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Package, DollarSign, Phone, LogIn, UserPlus, History } from 'lucide-react';
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
    { label: 'Logistics', path: '/pricing', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { label: 'Contact', path: '/contact', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  const userNavItems = user
    ? [
        { label: 'History', path: '/dashboard', icon: <History className="h-4 w-4 mr-2" /> },
        { label: 'Profile', path: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
        { label: 'Logout', onClick: handleLogout, icon: <LogOut className="h-4 w-4 mr-2" /> },
      ]
    : [
        { label: 'Login', path: '/login', icon: <LogIn className="h-4 w-4 mr-2" /> },
        { label: 'Register', path: '/register', icon: <UserPlus className="h-4 w-4 mr-2" /> },
      ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-sm shadow-lg shadow-primary/5 transform' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold text-primary hover:opacity-80 transition-all duration-300 ease-out transform hover:scale-105"
          >
            Raithara Bhandara
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-muted hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </Link>
            ))}
            
            {userNavItems.map((item, index) => 
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-foreground hover:bg-muted hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${(navItems.length + index) * 100}ms` }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ animationDelay: `${(navItems.length + index) * 100}ms` }}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-all duration-300 ease-out transform hover:scale-110 hover:rotate-3"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} 
                aria-hidden="true" 
              />
              <X 
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                }`} 
                aria-hidden="true" 
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-card/95 backdrop-blur-sm border-t border-border/50 shadow-lg">
          <div className="container mx-auto px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2 ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-muted hover:shadow-sm'
                }`}
                onClick={closeMenu}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 0.3s ease-out ${index * 100}ms`
                }}
              >
                <span className="icon-hover">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border/50">
              {userNavItems.map((item, index) => 
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:shadow-sm"
                    onClick={closeMenu}
                    style={{ 
                      animationDelay: `${(navItems.length + index) * 100}ms`,
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `all 0.3s ease-out ${(navItems.length + index) * 100}ms`
                    }}
                  >
                    <span className="icon-hover">{item.icon}</span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMenu();
                      item.onClick?.();
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:shadow-sm"
                    style={{ 
                      animationDelay: `${(navItems.length + index) * 100}ms`,
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `all 0.3s ease-out ${(navItems.length + index) * 100}ms`
                    }}
                  >
                    <span className="icon-hover">{item.icon}</span>
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
