import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, MessageCircle, Sparkles } from 'lucide-react';
import { Language, BookingSession } from '../types';
import { getTranslation } from '../data/translations';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  bookings: BookingSession[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  bookings,
  onCancelBooking,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#0A2920] border-2 border-[#C5A059] rounded-2xl shadow-2xl text-[#FAF7F0] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#082119] via-[#0D3529] to-[#082119] p-6 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-bold font-serif text-xl text-white">{t.myBookings}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#E8D39E] hover:text-white hover:bg-[#124738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Bookings */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto opacity-50" />
              <p className="text-sm text-[#E8D39E] font-medium">{t.noBookings}</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#082119] p-5 rounded-xl border border-[#C5A059]/30 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#D4AF37] font-bold block">
                      REF: {b.referenceCode}
                    </span>
                    <h4 className="font-bold text-lg text-white font-serif">{b.serviceTitle}</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#124738] text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-[#FAF7F0]/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{b.date} at {b.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{b.locationName}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#C5A059]/10">
                  <a
                    href={`https://wa.me/251908275109?text=Hello%20HearMe%20Addis,%20checking%20my%20booking%20${b.referenceCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Support</span>
                  </a>

                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
