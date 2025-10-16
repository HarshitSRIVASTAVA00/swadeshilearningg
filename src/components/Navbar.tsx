import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Scroll, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "COURSES", path: "/courses" },
    { name: "TEACH", path: "/teach" },
    { name: "COMMUNITY", path: "/community" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="gradient-text">Swadeshi</span>
            <span className="text-foreground ml-2">Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="relative text-sm font-semibold tracking-wide transition-colors hover:text-primary text-foreground flex items-center gap-1 outline-none">
                LIBRARY
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-lg border-border">
                <DropdownMenuItem asChild>
                  <Link to="/bharatiya-gyaan-kosh" className="flex items-center gap-2 cursor-pointer">
                    <BookOpen className="h-4 w-4" />
                    Bharatiya Gyaan Kosh
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ancient-scripture" className="flex items-center gap-2 cursor-pointer">
                    <Scroll className="h-4 w-4" />
                    Ancient Scripture
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-primary to-secondary">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-semibold tracking-wide transition-colors hover:text-primary text-foreground flex items-center gap-1 outline-none">
                  LIBRARY
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur-lg border-border">
                  <DropdownMenuItem asChild>
                    <Link to="/bharatiya-gyaan-kosh" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookOpen className="h-4 w-4" />
                      Bharatiya Gyaan Kosh
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ancient-scripture" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                      <Scroll className="h-4 w-4" />
                      Ancient Scripture
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex gap-2 items-center">
                <ThemeToggle />
                <Link to="/dashboard" className="flex-1">
                  <Button className="bg-gradient-to-r from-primary to-secondary w-full">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
