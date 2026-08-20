import React from 'react';
import { MapPin, Coffee, Navigation } from 'lucide-react';
import { Language } from '../types';
import { addisLocationsData } from '../data/mockData';

interface AddisLocationsProps {
  lang: Language;
  onOpenBookingWithLocation: (locationName: string) => void;
}

export const AddisLocations: React.FC<AddisLocationsProps> = ({
  lang,
  onOpenBookingWithLocation,
}) => {
  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#0A2619] text-[#F5F2ED] relative overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            ADDIS ABABA SAFE SPACES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-[#F5F2ED] tracking-tight">
            {lang === 'am' ? 'በአዲስ አበባ የሚገኙ የመገናኛ ቦታዎቻችን' : 'Safe Places Across Addis Ababa'}
          </h2>

          <p className="text-base sm:text-lg font-sans font-light text-[#F5F2ED]/70 max-w-xl mx-auto">
            Peaceful, quiet, and welcoming cafes and sanctuaries selected for private, meaningful conversation.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {addisLocationsData.map((loc) => {
            const name = lang === 'am' ? loc.nameAm : loc.nameEn;
            const desc = lang === 'am' ? loc.descriptionAm : loc.descriptionEn;

            return (
              <div
                key={loc.id}
                className="bg-[#06180F] rounded-sm p-8 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-sans text-[#D4AF37] uppercase tracking-wider block font-medium">
                        {loc.area}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F5F2ED] mt-1">
                        {name}
                      </h3>
                    </div>

                    <span className="px-2.5 py-1 rounded-sm bg-[#0A2619] text-[#D4AF37] text-[11px] font-sans border border-[#D4AF37]/30 shrink-0">
                      {loc.quietLevel}
                    </span>
                  </div>

                  <p className="text-sm font-sans font-light text-[#F5F2ED]/80 leading-relaxed">
                    {desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#D4AF37]/15 text-xs font-sans text-[#F5F2ED]/70">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{loc.coffeeStyle}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingWithLocation(name)}
                  className="w-full bg-[#0A2619] hover:bg-[#124738] text-[#F5F2ED] py-3 px-4 rounded-sm font-sans font-medium text-xs tracking-wider uppercase border border-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'am' ? `በ${loc.area} ቀጠሮ ይያዙ` : `Book Session in ${loc.area}`}</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
