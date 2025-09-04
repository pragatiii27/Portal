import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  ExternalLink,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import kumbhLogo from "@/assets/kumbh-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Project Dashboard", href: "/projects" },
    { name: "Cost Estimation", href: "/finances" },
    { name: "Reports & Updates", href: "/reports" },
    { name: "Department Wise", href: "/departments" },
    { name: "Admin Panel", href: "/admin" }
  ];

  const importantLinks = [
    { name: "Government of Maharashtra", href: "https://maharashtra.gov.in/", external: true },
    { name: "Nashik Municipal Corporation", href: "https://nmc.gov.in/", external: true },
    { name: "Kumbh Mela Official", href: "https://www.kumbh.gov.in/en/", external: true },
    { name: "Digital India", href: "https://www.digitalindia.gov.in/", external: true },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Nashik Municipal Corporation, Rajiv Gandhi Bhavan, Nashik - 422001, Maharashtra"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91-253-2506001, +91-253-2506002"
    },
    {
      icon: Mail,
      title: "Email",
      content: "kumbh.progress@nashikcorp.gov.in"
    },
    {
      icon: Globe,
      title: "Website",
      content: "www.nashikcorp.gov.in"
    }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Branding & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src={kumbhLogo} alt="Kumbh Mela Logo" className="h-10 w-10" />
              <div>
                <h3 className="text-lg font-bold text-white">Kumbh Progress Watch</h3>
                <p className="text-sm text-secondary-foreground/80">NMC Official Portal</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 mb-4 text-sm">
              Official project tracking portal for Kumbh Mela 2027 infrastructure development by Nashik Municipal Corporation.
            </p>
            <Badge className="bg-primary/20 text-white border-white/30">
              Government of Maharashtra
            </Badge>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Important Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-secondary-foreground/80 hover:text-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    {link.external && <ExternalLink className="h-3 w-3 ml-1 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <contact.icon className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-white mb-1">{contact.title}</div>
                    <div className="text-xs text-secondary-foreground/80">{contact.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <Button size="sm" variant="ghost" className="p-2 text-secondary-foreground/80 hover:text-gold">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-secondary-foreground/80 hover:text-gold">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-secondary-foreground/80 hover:text-gold">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="opacity-20" />

      {/* Bottom Footer */}
      <div className="bg-navy py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-white/80 mb-2 md:mb-0">
              © 2024 Nashik Municipal Corporation. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-white/60">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
              <span className="text-xs">Last updated: December 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;