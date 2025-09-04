import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import kumbhLogo from "@/assets/kumbh-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Departments", href: "/departments" },
    { name: "Finances", href: "/finances" },
    { name: "Downloads", href: "/downloads" },
    { name: "About", href: "/about" }
  ];

  return (
    <header className="bg-secondary shadow-elegant sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-gradient-primary text-white py-1 px-4">
        <div className="container mx-auto text-center text-sm">
          Government of Maharashtra | Nashik Municipal Corporation | Kumbh Mela 2027
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and branding */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={kumbhLogo} alt="Kumbh Mela Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-xl font-bold text-white">Kumbh Mela 2027</h1>
              <p className="text-sm text-secondary-foreground/80">Nashik Municipal Corporation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white hover:text-gold">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-gold">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <User className="h-4 w-4 mr-2" />
              Admin Panel
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-gold transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button size="sm" className="bg-primary hover:bg-primary/90 self-start mt-4">
                <User className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;