import React from 'react';
import { Headphones, Coffee, Users, HeartHandshake, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { servicesData } from '../data/mockData';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceToBook,
}) => {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case '🎧':
        return <Headphones className="w-6 h-6 text-[#D4AF37]" />;
      case '☕':
        return <Coffee className="w-6 h-6 text-[#D4AF37]" />;
      case '👥':
        return <Users className="w-6 h-6 text-[#D4AF37]" />;
      case '🤝':
        return <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Headphones className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0A2619] text-[#F5F2ED] relative overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#D4AF37]">
            OUR SERVICES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-[#F5F2ED] tracking-tight">
            {lang === 'am' ? 'የምንገናኝባቸው መንገዶች' : 'How we connect'}
          </h2>

          <p className="text-base sm:text-lg text-[#F5F2ED]/70 font-sans font-light max-w-xl mx-auto">
            Choose the environment where you feel most comfortable sharing and listening.
          </p>
        </div>

        {/* Services 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const title = lang === 'am' ? service.titleAm : service.titleEn;
            const desc = lang === 'am' ? service.descriptionAm : service.descriptionEn;

            return (
              <div
                key={service.id}
                className="bg-[#06180F] rounded-sm p-8 sm:p-10 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-sm bg-[#0A2619] border border-[#D4AF37]/40 flex items-center justify-center">
                    {getIconComponent(service.icon)}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F5F2ED] tracking-wide">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base font-sans font-light text-[#F5F2ED]/80 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-xs font-sans text-[#D4AF37] tracking-wider uppercase">
                    {service.duration}
                  </span>

                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="text-xs font-sans uppercase tracking-wider text-[#F5F2ED] hover:text-[#D4AF37] font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
