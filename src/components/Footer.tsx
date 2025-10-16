import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import DailyWisdom from "@/components/DailyWisdom";
import scripturesData from "@/data/scriptures.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Daily Wisdom Section */}
        <div className="mb-12 max-w-2xl mx-auto">
          <DailyWisdom quotes={scripturesData.dailyWisdom} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="gradient-text">Swadeshi</span> Learning
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building Atmanirbhar Bharat, one skill at a time. Empowering learners through indigenous knowledge.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/teach" className="text-sm text-muted-foreground hover:text-primary transition-colors">Teach</Link></li>
              <li><Link to="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover-glow transition-all hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover-glow transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover-glow transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover-glow transition-all hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Swadeshi Learning Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
