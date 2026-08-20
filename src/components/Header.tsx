import React, { useState } from 'react';
import { Heart, Calendar, MessageCircle, MapPin, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
  onOpenMyBookings,
  bookingCount,
}) => {
  const t = getTranslation(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A2619]/95 backdrop-blur-md border-b border-[#D4AF37]/20 text-[#F5F2ED]">
      {/* Top Amharic & English Announcement Ribbon */}
      <div className="bg-[#06180F] py-2 px-4 text-center text-xs sm:text-sm font-medium border-b border-[#D4AF37]/20 tracking-wide text-[#E8D39E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#D4AF37]">
            <MapPin className="w-3.5 h-3.5" /> Addis Ababa, Ethiopia
          </span>
          <p className="mx-auto flex items-center gap-2">
            <span className="font-semibold text-[#D4AF37]">"ብቻዎን አይደሉም፤ እኛ እንሰማዎታለን።"</span>
            <span className="hidden md:inline text-xs opacity-80">| You are not alone. We are here to listen.</span>
          </p>
          <a
            href="https://wa.me/251908275109?text=Hello%20HearMe%20Addis,%20I%20would%20like%20to%20learn%20more."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#06180F] shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-[#D4AF37] font-bold text-xl font-serif">H</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-light tracking-[0.15em] text-[#F5F2ED] block leading-tight font-sans uppercase">
              HearMe <span className="text-[#D4AF37] font-semibold">Addis</span>
            </span>
            <span className="text-[10px] sm:text-xs text-[#D4AF37]/80 tracking-widest uppercase block font-sans">
              Safe Listening & Connection
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-sans uppercase tracking-widest font-medium opacity-90">
          <a href="#home" className="hover:text-[#D4AF37] transition-colors">{t.nav.home}</a>
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">{t.nav.about}</a>
          <a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.nav.services}</a>
          <a href="#community" className="hover:text-[#D4AF37] transition-colors">Community</a>
          <a href="#locations" className="hover:text-[#D4AF37] transition-colors">{t.nav.locations}</a>
          <a href="#contact" className="hover:text-[#D4AF37] transition-colors">{t.nav.contact}</a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Button */}
          <div className="bg-[#06180F] p-1 rounded-sm border border-[#D4AF37]/30 flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-sm transition-all ${
                lang === 'en'
                  ? 'bg-[#D4AF37] text-[#0A2619] font-bold'
                  : 'text-[#E8D39E] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('am')}
              className={`px-2 py-0.5 rounded-sm transition-all ${
                lang === 'am'
                  ? 'bg-[#D4AF37] text-[#0A2619] font-bold'
                  : 'text-[#E8D39E] hover:text-white'
              }`}
            >
              አማርኛ
            </button>
          </div>

          {/* User's Bookings button if count > 0 */}
          {bookingCount > 0 && (
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 rounded-sm bg-[#06180F] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all"
              title={t.myBookings}
            >
              <Calendar className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0A2619] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {bookingCount}
              </span>
            </button>
          )}

          {/* Main Book Session CTA Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex bg-[#D4AF37] text-[#0A2619] px-5 py-2.5 rounded-sm font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#F5F2ED] transition-all items-center gap-2 cursor-pointer shadow-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Your Session</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#D4AF37] hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06180F] border-b border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-4 text-sm font-sans uppercase tracking-widest">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            {t.nav.about}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            {t.nav.services}
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            Community
          </a>
          <a
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            {t.nav.locations}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#D4AF37] py-1 border-b border-[#D4AF37]/10"
          >
            {t.nav.contact}
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-2 w-full bg-[#D4AF37] text-[#0A2619] py-3 rounded-sm font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#F5F2ED] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Session</span>
          </button>
        </div>
      )}
    </header>
  );
};
