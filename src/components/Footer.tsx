import React from 'react';
import { Heart, MapPin, Mail, MessageCircle, Instagram, Headphones } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenListenerApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenBooking,
  onOpenListenerApp,
}) => {
  return (
    <footer id="contact" className="bg-[#0A2619] text-[#F5F2ED] pt-16 pb-12 relative overflow-hidden border-t border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
                <Heart className="w-4 h-4 fill-[#D4AF37]" />
              </div>
              <span className="text-xl font-serif text-[#F5F2ED] tracking-wide">
                HearMe <span className="text-[#D4AF37]">Addis</span>
              </span>
            </div>

            <p className="text-xs font-serif italic text-[#D4AF37] border-l-2 border-[#D4AF37] pl-3 leading-relaxed">
              "ብቻዎን አይደሉም፤ እኛ እንሰማዎታለን።"
              <span className="block text-[11px] text-[#F5F2ED]/70 not-italic font-sans mt-1">
                You are not alone. We are here to listen.
              </span>
            </p>

            <p className="text-xs font-sans font-light text-[#F5F2ED]/70 leading-relaxed">
              A safe place to talk, feel heard, and build meaningful human connections in Addis Ababa.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans font-light text-[#F5F2ED]/80">
              <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a></li>
              <li><a href="#community" className="hover:text-[#D4AF37] transition-colors">Community</a></li>
              <li><a href="#locations" className="hover:text-[#D4AF37] transition-colors">Safe Spaces</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-medium">
              Contact Us
            </h4>

            <div className="space-y-2.5 text-xs font-sans font-light text-[#F5F2ED]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>📍 Addis Ababa, Ethiopia</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/251908275109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  📱 Phone / WhatsApp: 0908275109
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="mailto:hello@hearmeaddis.com" className="hover:text-[#D4AF37] transition-colors">
                  📧 hello@hearmeaddis.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-medium">
              Get Involved
            </h4>

            <button
              onClick={onOpenBooking}
              className="w-full bg-[#D4AF37] hover:bg-[#c49f30] text-[#0A2619] py-2.5 px-4 rounded-sm font-sans font-medium text-xs tracking-wider uppercase transition-all text-center block cursor-pointer"
            >
              Book Session
            </button>

            <button
              onClick={onOpenListenerApp}
              className="w-full bg-[#06180F] hover:bg-[#082119] text-[#F5F2ED] py-2.5 px-4 rounded-sm font-sans font-light text-xs border border-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Become a Listener</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans font-light text-[#F5F2ED]/60">
          <p>© {new Date().getFullYear()} HearMe Addis. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5 text-[#D4AF37]" /> @hearmeaddis
            </a>
            <span>•</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
