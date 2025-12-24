import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About', href: '/#about', isRoute: false },
  { label: 'Services', href: '/#services', isRoute: false },
  { label: 'Book Spray', href: '/book-spray', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header should be light themed on non-home pages or when scrolled
  const useLightTheme = !isHomePage || isScrolled;

  const renderNavLink = (link: typeof navLinks[0]) => {
    const className = `font-medium transition-colors duration-200 hover:text-primary ${
      useLightTheme ? 'text-foreground' : 'text-primary-foreground/90 hover:text-primary-foreground'
    }`;

    if (link.isRoute) {
      return (
        <Link key={link.label} to={link.href} className={className}>
          {link.label}
        </Link>
      );
    }
    return (
      <a key={link.label} href={link.href} className={className}>
        {link.label}
      </a>
    );
  };

  const renderMobileNavLink = (link: typeof navLinks[0]) => {
    const className = "font-medium text-foreground hover:text-primary transition-colors py-2";

    if (link.isRoute) {
      return (
        <Link
          key={link.label}
          to={link.href}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.label}
        href={link.href}
        className={className}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.label}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useLightTheme
          ? 'bg-card/95 backdrop-blur-md shadow-header'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary-foreground"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className={`font-heading font-bold text-xl ${useLightTheme ? 'text-foreground' : 'text-primary-foreground'}`}>
              XroneTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(renderNavLink)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+1234567890" className={`flex items-center gap-2 font-medium ${useLightTheme ? 'text-foreground' : 'text-primary-foreground'}`}>
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
            <Button variant={useLightTheme ? "default" : "hero"} size="default" asChild>
              <Link to="/book-spray">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${useLightTheme ? 'text-foreground' : 'text-primary-foreground'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${useLightTheme ? 'text-foreground' : 'text-primary-foreground'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card shadow-card-hover p-4 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map(renderMobileNavLink)}
              <Button variant="default" size="lg" className="mt-2" asChild>
                <Link to="/book-spray" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
