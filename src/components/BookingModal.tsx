import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, User, Phone, Mail, MessageSquare, CheckCircle2, MessageCircle, Sparkles, Headphones, Coffee, Users, HeartHandshake, Download } from 'lucide-react';
import { Language, BookingSession } from '../types';
import { servicesData, addisLocationsData } from '../data/mockData';
import { getTranslation } from '../data/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preSelectedServiceId?: string;
  preSelectedLocation?: string;
  onBookingCreated: (session: BookingSession) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  preSelectedServiceId,
  preSelectedLocation,
  onBookingCreated,
}) => {
  const t = getTranslation(lang);

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preSelectedServiceId || 'one-on-one');
  const [preferredLang, setPreferredLang] = useState<'en' | 'am' | 'both'>('both');
  const [locationType, setLocationType] = useState<'coffee_cafe' | 'studio' | 'online'>('coffee_cafe');
  const [locationName, setLocationName] = useState<string>(preSelectedLocation || addisLocationsData[0].nameEn);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('03:00 PM (EAT)');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [createdBooking, setCreatedBooking] = useState<BookingSession | null>(null);

  useEffect(() => {
    if (preSelectedServiceId) setSelectedServiceId(preSelectedServiceId);
    if (preSelectedLocation) setLocationName(preSelectedLocation);
  }, [preSelectedServiceId, preSelectedLocation]);

  if (!isOpen) return null;

  const currentService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const refCode = `HMA-${Math.floor(10000 + Math.random() * 90000)}`;
    const newSession: BookingSession = {
      id: `booking-${Date.now()}`,
      serviceId: currentService.id,
      serviceTitle: lang === 'am' ? currentService.titleAm : currentService.titleEn,
      fullName: fullName || 'Valued Visitor',
      phone: phone || '0908275109',
      email: email || 'visitor@example.com',
      preferredLanguage: preferredLang,
      locationType,
      locationName,
      date: selectedDate,
      timeSlot,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      referenceCode: refCode,
    };

    onBookingCreated(newSession);
    setCreatedBooking(newSession);
    setStep(5); // Confirmation screen
  };

  // Helper to generate downloadable .ics calendar file
  const downloadIcsCalendar = () => {
    if (!createdBooking) return;
    const title = `HearMe Addis - ${createdBooking.serviceTitle}`;
    const description = `Listening Session with HearMe Addis. Reference: ${createdBooking.referenceCode}. Location: ${createdBooking.locationName}.`;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HearMe Addis//Listening Session//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${createdBooking.locationName}
DTSTART:${createdBooking.date.replace(/-/g, '')}T150000Z
DTEND:${createdBooking.date.replace(/-/g, '')}T160000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `HearMe_Addis_Session_${createdBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prefilled WhatsApp text link
  const getWhatsAppLink = () => {
    if (!createdBooking) return '#';
    const text = encodeURIComponent(
      `Hello HearMe Addis! I have booked a session.\n\n` +
      `📌 Reference: ${createdBooking.referenceCode}\n` +
      `🎧 Service: ${createdBooking.serviceTitle}\n` +
      `📅 Date: ${createdBooking.date} at ${createdBooking.timeSlot}\n` +
      `📍 Location: ${createdBooking.locationName}\n` +
      `👤 Name: ${createdBooking.fullName}\n\n` +
      `Please confirm my session.`
    );
    return `https://wa.me/251908275109?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A2920] border-2 border-[#C5A059] rounded-2xl shadow-2xl text-[#FAF7F0] overflow-hidden my-8">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#082119] via-[#0D3529] to-[#082119] p-6 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059] text-[#0A2920] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-xl text-white">
                {step === 5 ? (lang === 'am' ? 'ቀጠሮዎ ተረጋግጧል!' : 'Session Confirmed!') : t.bookSession}
              </h3>
              <p className="text-xs text-[#E8D39E]">
                {step === 5 ? `Ref: ${createdBooking?.referenceCode}` : t.bookSessionSub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#E8D39E] hover:text-white hover:bg-[#124738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="bg-[#082119] px-6 py-3 border-b border-[#C5A059]/20 flex items-center justify-between text-xs text-[#E8D39E]">
            <span className={step >= 1 ? 'font-bold text-[#D4AF37]' : 'opacity-60'}>1. Service</span>
            <span>→</span>
            <span className={step >= 2 ? 'font-bold text-[#D4AF37]' : 'opacity-60'}>2. Language</span>
            <span>→</span>
            <span className={step >= 3 ? 'font-bold text-[#D4AF37]' : 'opacity-60'}>3. Date & Place</span>
            <span>→</span>
            <span className={step >= 4 ? 'font-bold text-[#D4AF37]' : 'opacity-60'}>4. Details</span>
          </div>
        )}

        {/* Form Body Container */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold font-serif text-[#E8D39E]">
                {lang === 'am' ? '1. አገልግሎት ይምረጡ' : '1. Choose Your Preferred Session Type'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesData.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedServiceId === s.id
                        ? 'bg-[#124738] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                        : 'bg-[#082119] border-[#C5A059]/30 hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <h5 className="font-bold text-white text-base">
                      {lang === 'am' ? s.titleAm : s.titleEn}
                    </h5>
                    <p className="text-xs text-[#FAF7F0]/70 mt-1 line-clamp-2">
                      {lang === 'am' ? s.descriptionAm : s.descriptionEn}
                    </p>
                    <span className="inline-block mt-3 text-[11px] font-semibold text-[#D4AF37]">
                      {s.duration}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gold-gradient text-[#0A2920] px-6 py-3 rounded-xl font-bold text-sm shadow hover:brightness-105 transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ቀጣይ (ቋንቋ)' : 'Next: Language Preference →'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LANGUAGE & LISTENER PREFERENCE */}
          {step === 2 && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-serif text-[#E8D39E]">
                {lang === 'am' ? '2. የሚመርጡት የውይይት ቋንቋ' : '2. Language Preference for Your Listener'}
              </h4>

              <div className="space-y-3">
                <label
                  onClick={() => setPreferredLang('both')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    preferredLang === 'both'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#FAF7F0]/80'
                  }`}
                >
                  <div>
                    <span className="font-bold block">Amharic & English (ሁለቱም)</span>
                    <span className="text-xs text-[#E8D39E]">Comfortable switching seamlessly between both.</span>
                  </div>
                  <CheckCircle2 className={`w-5 h-5 ${preferredLang === 'both' ? 'text-[#D4AF37]' : 'opacity-20'}`} />
                </label>

                <label
                  onClick={() => setPreferredLang('am')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    preferredLang === 'am'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#FAF7F0]/80'
                  }`}
                >
                  <div>
                    <span className="font-bold block">Amharic Only (አማርኛ ብቻ)</span>
                    <span className="text-xs text-[#E8D39E]">በአማርኛ ቋንቋ ብቻ በሙሉ ምቾት መነጋገር ለሚፈልጉ።</span>
                  </div>
                  <CheckCircle2 className={`w-5 h-5 ${preferredLang === 'am' ? 'text-[#D4AF37]' : 'opacity-20'}`} />
                </label>

                <label
                  onClick={() => setPreferredLang('en')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    preferredLang === 'en'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#FAF7F0]/80'
                  }`}
                >
                  <div>
                    <span className="font-bold block">English Only</span>
                    <span className="text-xs text-[#E8D39E]">Dedicated fluent English-speaking listener.</span>
                  </div>
                  <CheckCircle2 className={`w-5 h-5 ${preferredLang === 'en' ? 'text-[#D4AF37]' : 'opacity-20'}`} />
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#E8D39E] hover:text-white"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-gold-gradient text-[#0A2920] px-6 py-3 rounded-xl font-bold text-sm shadow hover:brightness-105 transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ቀጣይ (ቦታ እና ሰዓት)' : 'Next: Date & Location →'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE, TIME & LOCATION */}
          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-serif text-[#E8D39E]">
                {lang === 'am' ? '3. ቀንን፣ ሰዓትን እና ቦታን ይምረጡ' : '3. Choose Date, Time & Location in Addis'}
              </h4>

              {/* Location Type Option */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLocationType('coffee_cafe')}
                  className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                    locationType === 'coffee_cafe'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#E8D39E]'
                  }`}
                >
                  ☕ Partner Cafe
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('studio')}
                  className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                    locationType === 'studio'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#E8D39E]'
                  }`}
                >
                  🏠 Quiet Studio
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('online')}
                  className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                    locationType === 'online'
                      ? 'bg-[#124738] border-[#D4AF37] text-white'
                      : 'bg-[#082119] border-[#C5A059]/30 text-[#E8D39E]'
                  }`}
                >
                  💻 Virtual Call
                </button>
              </div>

              {/* Location Name Selector if Cafe or Studio */}
              {locationType !== 'online' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E8D39E] block">
                    Select Addis Area / Cafe:
                  </label>
                  <select
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {addisLocationsData.map((loc) => (
                      <option key={loc.id} value={lang === 'am' ? loc.nameAm : loc.nameEn}>
                        {loc.area} - {lang === 'am' ? loc.nameAm : loc.nameEn} ({loc.quietLevel})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E8D39E] block">Preferred Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#E8D39E] block">Time Slot (EAT GMT+3):</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="10:00 AM (EAT)">10:00 AM (EAT / 4:00 ጧት)</option>
                    <option value="02:00 PM (EAT)">02:00 PM (EAT / 8:00 ከሰዓት)</option>
                    <option value="03:30 PM (EAT)">03:30 PM (EAT / 9:30 ከሰዓት)</option>
                    <option value="05:30 PM (EAT)">05:30 PM (EAT / 11:30 ከሰዓት)</option>
                    <option value="07:00 PM (EAT)">07:00 PM (EAT / 1:00 ምሽት)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-[#E8D39E] hover:text-white"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="bg-gold-gradient text-[#0A2920] px-6 py-3 rounded-xl font-bold text-sm shadow hover:brightness-105 transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ቀጣይ (መረጃዎ)' : 'Next: Contact Info →'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & NOTES FORM */}
          {step === 4 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <h4 className="text-lg font-bold font-serif text-[#E8D39E]">
                {lang === 'am' ? '4. መረጃዎን ያስገቡ' : '4. Your Contact Details'}
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#E8D39E] block mb-1">Full Name / ስም:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bethlehem Tadesse"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#E8D39E] block mb-1">Phone / WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      placeholder="0908275109"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#E8D39E] block mb-1">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#E8D39E] block mb-1">
                    {lang === 'am' ? 'ምን ማጋራት ይፈልጋሉ? (አማራጭ)' : 'Anything on your mind? (Optional & Confidential)'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. I just want a calm cup of coffee and someone to listen about my week..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#082119] border border-[#C5A059]/40 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-[#E8D39E] hover:text-white"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="bg-gold-gradient text-[#0A2920] px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:brightness-105 transition-all cursor-pointer border border-[#FDF0CA]/40"
                >
                  {lang === 'am' ? 'ቀጠሮውን አረጋግጥ' : 'Confirm & Reserve Session'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION SCREEN */}
          {step === 5 && createdBooking && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#C5A059] text-[#0A2920] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-white">
                  {lang === 'am' ? 'ቀጠሮዎ በስኬት ተይዟል!' : 'Your Session is Booked!'}
                </h4>
                <p className="text-sm text-[#E8D39E] mt-1">
                  "You are not alone. We are here to listen."
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#082119] p-6 rounded-2xl border border-[#C5A059]/30 text-left space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-2">
                  <span className="text-[#E8D39E]">Reference Code:</span>
                  <span className="font-mono font-bold text-[#D4AF37] text-base">{createdBooking.referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/70">Session:</span>
                  <span className="font-bold text-white">{createdBooking.serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/70">Date & Time:</span>
                  <span className="text-white">{createdBooking.date} at {createdBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/70">Location:</span>
                  <span className="text-white">{createdBooking.locationName}</span>
                </div>
              </div>

              {/* CTAs: WhatsApp & Add to Calendar */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.confirmWhatsApp}</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={downloadIcsCalendar}
                    className="bg-[#124738] hover:bg-[#164E3D] text-[#E8D39E] hover:text-white py-3 px-4 rounded-xl text-xs font-bold border border-[#C5A059]/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.addToCalendar}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="bg-gold-gradient text-[#0A2920] py-3 px-4 rounded-xl text-xs font-bold shadow transition-all"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
