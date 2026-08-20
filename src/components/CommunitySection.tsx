import React from 'react';
import { Coffee, Heart, Sparkles, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface CommunitySectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ lang, onOpenBooking }) => {
  return (
    <section className="bg-[#FAF7F0] text-[#22252A] py-20 lg:py-28 relative overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Community Highlight Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              COMMUNITY & CONNECTION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-[#0A2619] leading-tight">
              Real conversations.<br />Genuine connection.
            </h2>

            <p className="text-base sm:text-lg font-sans font-light text-[#22252A]/80 leading-relaxed">
              HearMe Addis is more than a listening service — it is a growing movement toward empathy, kindness, and human presence across Addis Ababa. Whether over a quiet pot of coffee or in a small group gathering, we create room for authentic human interaction.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-sm font-sans font-light text-[#0A2619]">
              <div className="flex items-center gap-2.5 p-3 rounded-sm bg-white border border-[#D4AF37]/30">
                <Coffee className="w-4 h-4 text-[#D4AF37]" />
                <span>Buna Conversations</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-sm bg-white border border-[#D4AF37]/30">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Respectful Spaces</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="lg:col-span-6 bg-[#0A2619] text-[#F5F2ED] p-8 sm:p-12 rounded-sm border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl" />
            
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Heart className="w-6 h-6" />
              </div>

              <blockquote className="text-xl sm:text-2xl font-serif font-light text-[#F5F2ED] italic leading-relaxed">
                " In our fast-moving city, having someone sit with you, pour coffee, and truly listen is one of the most powerful gifts we can share."
              </blockquote>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-sans text-[#D4AF37]">
                <span>HearMe Addis Community</span>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Booking CTA Banner */}
        <div className="bg-[#0A2619] text-[#F5F2ED] rounded-sm p-8 sm:p-12 border border-[#D4AF37]/40 text-center relative overflow-hidden shadow-lg space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F5F2ED]">
              Sometimes, being heard is all you need.
            </h3>
            
            <p className="text-base font-sans font-light text-[#F5F2ED]/80 leading-relaxed">
              Take a moment for yourself. Start a conversation and connect with someone who is ready to listen.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#D4AF37] hover:bg-[#c49f30] text-[#0A2619] py-3.5 px-8 rounded-sm font-sans font-medium text-sm tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Session</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
