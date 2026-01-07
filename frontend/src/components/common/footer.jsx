import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

// Path to your logo
import LogoImage from '/images/white logo.png'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/5 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Identity */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center">
              <img 
                src={LogoImage} 
                alt="SmartRozgar Logo" 
                className="h-20 w-auto object-contain transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Redefining the standard of home maintenance. Connecting you with elite professionals for a smarter, safer, and more comfortable lifestyle.
            </p>

            {/* Social Icons - Sleek Minimalist Style */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-11 h-11 bg-[#111111] border border-white/10 hover:border-[#00D1D1]/50 hover:text-[#00D1D1] rounded-2xl flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon size={18} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'About Platform', 'Our Services', 'Contact Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-[#00D1D1] transition-all text-sm flex items-center gap-2 group">
                    <div className="w-0 group-hover:w-4 h-[1px] bg-[#00D1D1] transition-all duration-300"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Categories */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Core Services</h3>
            <ul className="space-y-4">
              {['Electrical Solutions', 'Modern Plumbing', 'Interior Painting', 'Smart Cleaning'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-500 hover:text-[#00D1D1] transition-all text-sm flex items-center gap-2 group">
                    <div className="w-0 group-hover:w-4 h-[1px] bg-[#00D1D1] transition-all duration-300"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details - High Contrast */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Get In Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#0A0A0A] border border-white/5 rounded-xl flex items-center justify-center text-[#00D1D1]">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Email Us</span>
                    <a href="mailto:info@smartrozgar.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                    info@smartrozgar.com
                    </a>
                </div>
              </li>
              
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#0A0A0A] border border-white/5 rounded-xl flex items-center justify-center text-[#00D1D1]">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Call Expert</span>
                    <a href="tel:+923001234567" className="text-sm text-gray-300 hover:text-white transition-colors">
                    +92 300 1234567
                    </a>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#0A0A0A] border border-white/5 rounded-xl flex items-center justify-center text-[#00D1D1]">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Headquarters</span>
                    <span className="text-sm text-gray-300">Lahore, Punjab, PK</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Ultra Minimal */}
        <div className="border-t border-white/5 pt-10">
          <div className="flex flex-col md:row justify-between items-center gap-6">
            <p className="text-gray-600 text-[12px] tracking-wide">
              © {currentYear} <span className="text-white font-bold">SMARTROZGAR</span>. ENGINEERED FOR EXCELLENCE.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-gray-600 hover:text-white text-[11px] uppercase tracking-widest transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-white text-[11px] uppercase tracking-widest transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-white text-[11px] uppercase tracking-widest transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}