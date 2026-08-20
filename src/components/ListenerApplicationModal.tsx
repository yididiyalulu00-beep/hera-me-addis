import React, { useState } from 'react';
import { X, Headphones, CheckCircle2, Heart, Send } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface ListenerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ListenerApplicationModal: React.FC<ListenerApplicationModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = getTranslation(lang);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0A2920] border-2 border-[#C5A059] rounded-2xl shadow-2xl text-[#FAF7F0] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#082119] via-[#0D3529] to-[#082119] p-6 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-bold font-serif text-xl text-white">{t.becomeListener}</h3>
          </div>
          <button
            onClick={() => { setSubmitted(false); onClose(); }}
            className="p-2 rounded-lg text-[#E8D39E] hover:text-white hover:bg-[#124738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto" />
              <h4 className="text-2xl font-serif font-bold text-white">
                {lang === 'am' ? 'አመሰግናለሁ! ማመልከቻዎ ደርሶናል' : 'Thank You for Applying!'}
              </h4>
              <p className="text-sm text-[#E8D39E] max-w-sm mx-auto">
                {lang === 'am'
                  ? 'የHearMe Addis ቡድን ማመልከቻዎን አይቶ በ24 ሰዓት ውስጥ ያገኝዎታል።'
                  : 'Our team in Addis Ababa will review your application and reach out to you within 24 hours.'}
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="bg-gold-gradient text-[#0A2920] px-6 py-2.5 rounded-xl font-bold text-sm shadow mt-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <p className="text-[#E8D39E] italic">
                {t.becomeListenerSub}
              </p>

              <div>
                <label className="block text-[#E8D39E] font-semibold mb-1">Full Name / ስም:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Bekele"
                  className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#E8D39E] font-semibold mb-1">Phone / WhatsApp:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0908275109"
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[#E8D39E] font-semibold mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#E8D39E] font-semibold mb-1">
                  Why do you want to become a listener with HearMe Addis?
                </label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us about your empathy, active listening experience, or passion for community..."
                  className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-[#0A2920] font-bold py-3.5 px-4 rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
