import React from 'react';
import { Heart, Shield, Users, Coffee, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF7F0] text-[#22252A] relative overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A2619]/5 text-[#0A2619] border border-[#D4AF37]/40 text-xs font-sans font-medium uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>About HearMe Addis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-[#0A2619] leading-tight tracking-tight">
            At HearMe Addis, everyone deserves to be heard.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#22252A]/80 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            <p>
              At HearMe Addis, we believe everyone deserves to be heard.
            </p>
            <p>
              We provide a welcoming space where people can share their thoughts and feelings without judgment. Our mission is to reduce loneliness by creating genuine human connection through respectful listening and community.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-sm border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#0A2619] text-[#D4AF37] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#0A2619]">
              {lang === 'am' ? 'ያለ ምንም ፍርድ' : 'Safe & Confidential'}
            </h3>
            <p className="text-sm font-sans font-light text-[#22252A]/75 leading-relaxed">
              {lang === 'am'
                ? 'ያለ ምንም ፍርድ ወይም ምክር ሀሳብዎን በነፃነት የሚያካፍሉበት የተጠበቀ ቦታ።'
                : 'A confidential environment where you can express yourself freely with 100% privacy guaranteed.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans font-medium text-[#0A2619]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'am' ? 'ምስጢራዊነት የተጠበቀ' : 'No judgment'}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-sm border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#0A2619] text-[#D4AF37] flex items-center justify-center">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#0A2619]">
              {lang === 'am' ? 'የኢትዮጵያ ቡና ባህል' : 'Warm Ethiopian Connection'}
            </h3>
            <p className="text-sm font-sans font-light text-[#22252A]/75 leading-relaxed">
              {lang === 'am'
                ? 'በአዲስ አበባ ባህል መሰረት በሞቅ ያለ ቡና እና ፈገግታ የተሞላ አቀባበል እናደርግልዎታለን።'
                : 'Rooted in the warm Ethiopian tradition of coffee conversations, creating authentic human presence.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans font-medium text-[#0A2619]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'am' ? 'ሞቅ ያለ አቀባበል' : 'Genuine presence'}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-sm border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#0A2619] text-[#D4AF37] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#0A2619]">
              {lang === 'am' ? 'ብቸኝነትን መቀነስ' : 'Reducing Loneliness'}
            </h3>
            <p className="text-sm font-sans font-light text-[#22252A]/75 leading-relaxed">
              {lang === 'am'
                ? 'አዲስ አበባ ውስጥ ማንም ሰው ብቻውን እንዳልሆነ እንዲሰማው የማህበረሰብ ግንኙነት እንፈጥራለን።'
                : 'Fostering a supportive, connected community across Addis Ababa where everyone feels valued.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans font-medium text-[#0A2619]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'am' ? 'የማህበረሰብ አንድነት' : 'Community support'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
