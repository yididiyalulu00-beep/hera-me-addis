import React, { useState, useEffect } from 'react';
import { Language, BookingSession } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CommunitySection } from './components/CommunitySection';
import { AddisLocations } from './components/AddisLocations';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { ListenerApplicationModal } from './components/ListenerApplicationModal';
import { CalmAudioPlayer } from './components/CalmAudioPlayer';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isListenerAppOpen, setIsListenerAppOpen] = useState(false);
  
  // Selected pre-fills for booking modal
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);

  // Local storage persisted bookings
  const [bookings, setBookings] = useState<BookingSession[]>(() => {
    try {
      const saved = localStorage.getItem('hearme_addis_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hearme_addis_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings:', e);
    }
  }, [bookings]);

  const handleBookingCreated = (newSession: BookingSession) => {
    setBookings((prev) => [newSession, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedLocation(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithLocation = (locationName: string) => {
    setSelectedLocation(locationName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#22252A] font-sans">
      {/* Header Navigation */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onOpenBooking={() => {
          setSelectedServiceId(undefined);
          setSelectedLocation(undefined);
          setIsBookingOpen(true);
        }}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={bookings.length}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          lang={lang}
          onOpenBooking={() => {
            setSelectedServiceId(undefined);
            setSelectedLocation(undefined);
            setIsBookingOpen(true);
          }}
        />

        <AboutSection lang={lang} />

        <ServicesSection
          lang={lang}
          onSelectServiceToBook={handleOpenBookingWithService}
        />

        <CommunitySection
          lang={lang}
          onOpenBooking={() => {
            setSelectedServiceId(undefined);
            setSelectedLocation(undefined);
            setIsBookingOpen(true);
          }}
        />

        <AddisLocations
          lang={lang}
          onOpenBookingWithLocation={handleOpenBookingWithLocation}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => {
          setSelectedServiceId(undefined);
          setSelectedLocation(undefined);
          setIsBookingOpen(true);
        }}
        onOpenListenerApp={() => setIsListenerAppOpen(true)}
      />

      {/* Interactive Booking Modal Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        preSelectedServiceId={selectedServiceId}
        preSelectedLocation={selectedLocation}
        onBookingCreated={handleBookingCreated}
      />

      {/* User's Booked Sessions Drawer */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        lang={lang}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Become a Listener Application Modal */}
      <ListenerApplicationModal
        isOpen={isListenerAppOpen}
        onClose={() => setIsListenerAppOpen(false)}
        lang={lang}
      />

      {/* Soothing Ambient Soundscape Toggle Button */}
      <CalmAudioPlayer />
    </div>
  );
}
