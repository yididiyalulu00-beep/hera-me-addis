import React from 'react';
import { Calendar, Headphones, Coffee, Users, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const t = getTranslation(lang);

  return (
    <section id="home" className="relative bg-[#0A2619] text-[#F5F2ED] overflow-hidden py-16 lg:py-24 border-b border-[#D4AF37]/20">
      {/* Decorative Gold Subtle Radial Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Motto Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06180F] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-sans font-medium uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span>HEARME ADDIS</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light font-serif text-[#F5F2ED] leading-[1.15] tracking-tight">
                You are not alone.<br />
                <span className="text-[#D4AF37] italic font-normal">We are here to listen.</span>
              </h1>
              
              <div className="space-y-1.5 border-l-2 border-[#D4AF37] pl-4 py-1">
                <p className="text-lg sm:text-xl font-sans text-[#D4AF37] font-medium tracking-wide">
                  "You are not alone; we hear you."
                </p>
                <p className="text-lg sm:text-xl font-serif text-[#E8D39E]/90 italic">
                  "ብቻዎን አይደሉም፤ እኛ እንሰማዎታለን።"
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#F5F2ED]/80 font-sans font-light max-w-2xl leading-relaxed">
                A safe place to talk, feel heard, and build meaningful human connections.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#D4AF37] text-[#0A2619] px-7 py-3.5 rounded-sm font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#F5F2ED] shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Session</span>
              </button>

              <a
                href="#about"
                className="border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#F5F2ED] px-6 py-3.5 rounded-sm font-sans font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Learn More</span>
              </a>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#D4AF37]/20">
              <div className="flex items-center gap-2 bg-[#06180F]/80 p-3 rounded-sm border border-[#D4AF37]/20 text-xs text-[#E8D39E] font-sans">
                <Headphones className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>One-on-One</span>
              </div>
              <div className="flex items-center gap-2 bg-[#06180F]/80 p-3 rounded-sm border border-[#D4AF37]/20 text-xs text-[#E8D39E] font-sans">
                <Coffee className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Coffee Talks</span>
              </div>
              <div className="flex items-center gap-2 bg-[#06180F]/80 p-3 rounded-sm border border-[#D4AF37]/20 text-xs text-[#E8D39E] font-sans">
                <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Group Meetups</span>
              </div>
              <div className="flex items-center gap-2 bg-[#06180F]/80 p-3 rounded-sm border border-[#D4AF37]/20 text-xs text-[#E8D39E] font-sans">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% Confidential</span>
              </div>
            </div>

          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-md rounded-md p-1 bg-[#D4AF37]/30 border border-[#D4AF37]/40 shadow-2xl">
              <div className="bg-[#06180F] rounded-sm overflow-hidden relative">
                
                {/* Hero Banner Image */}
                <img
                  src="/src/assets/images/hearme_hero_banner_1786325195007.jpg"
                  alt="HearMe Addis Conversation"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-80 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Badge Card */}
                <div className="p-6 bg-[#06180F]/95 relative space-y-4 border-t border-[#D4AF37]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#0A2619] text-[#D4AF37] font-serif font-bold text-xl shrink-0">
                      H
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-light text-[#F5F2ED] tracking-wider uppercase">HearMe Addis</h3>
                      <p className="text-xs text-[#D4AF37] font-sans">Addis Ababa, Ethiopia</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#E8D39E] font-sans font-medium mt-1">
                        <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>A Place to Belong</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#F5F2ED]/75 font-sans italic border-t border-[#D4AF37]/20 pt-3 leading-relaxed">
                    "At HearMe Addis, we believe everyone deserves to be heard. Our mission is to reduce loneliness through respectful listening."
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
