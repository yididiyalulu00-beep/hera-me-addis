export type Language = 'en' | 'am';

export interface Service {
  id: string;
  icon: string; // lucide icon name or emoji
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  duration: string;
  idealForEn: string;
  idealForAm: string;
  tagEn: string;
  tagAm: string;
  priceEn: string;
  priceAm: string;
}

export interface BookingSession {
  id: string;
  serviceId: string;
  serviceTitle: string;
  fullName: string;
  phone: string;
  email: string;
  preferredLanguage: 'en' | 'am' | 'both';
  locationType: 'coffee_cafe' | 'studio' | 'online';
  locationName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
  referenceCode: string;
}

export interface SocialPost {
  id: number;
  titleEn: string;
  titleAm: string;
  captionEn: string;
  captionAm: string;
  hashtags: string[];
  theme: 'deep-green' | 'cream-gold' | 'gold-luxury';
  imageNote?: string;
}

export interface AddisLocation {
  id: string;
  nameEn: string;
  nameAm: string;
  area: string;
  descriptionEn: string;
  descriptionAm: string;
  quietLevel: string;
  address: string;
  coffeeStyle: string;
}

export interface ListenerApplicant {
  fullName: string;
  email: string;
  phone: string;
  languages: string[];
  whyJoin: string;
  availability: string;
}
