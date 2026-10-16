export type ListingType = 'buy' | 'rent' | 'new_development';

export type PropertyType = 
  | 'Villa' 
  | 'Penthouse' 
  | 'Palatial Mansion' 
  | 'Waterfront Residence' 
  | 'Duplex' 
  | 'Sky Villa'
  | 'Townhouse';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export interface Property {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  listingType: ListingType;
  propertyType: PropertyType;
  price: number; // in QAR
  currency: 'QAR';
  location: {
    en: string;
    ar: string;
    area: string; // Pearl, Lusail, West Bay, Msheireb, Al Waab, Katara Hills
    address: string;
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  areaSqM: number;
  landAreaSqM?: number;
  furnishing: FurnishingStatus;
  yearBuilt: number;
  featured: boolean;
  exclusive: boolean;
  images: string[];
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  amenities: string[];
  specifications: {
    parkingSpaces: number;
    view: string;
    cooling: string;
    flooring: string;
    ceilingHeight?: string;
  };
  agentId: string;
  projectId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: {
    en: string;
    ar: string;
  };
  developer: {
    en: string;
    ar: string;
  };
  tagline: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
    area: string;
    lat: number;
    lng: number;
  };
  startingPrice: number;
  completionDate: string;
  status: 'Under Construction' | 'Off-Plan' | 'Ready to Move' | 'Nearing Handover';
  propertyTypes: PropertyType[];
  heroImage: string;
  gallery: string[];
  masterPlanImage: string;
  amenities: string[];
  paymentPlan: {
    downPaymentPercent: number;
    constructionPercent: number;
    handoverPercent: number;
    postHandoverDuration?: string;
  };
  availableUnits: {
    type: string;
    sizeSqM: string;
    startingPrice: number;
    availableCount: number;
  }[];
  features: string[];
}

export interface Area {
  id: string;
  slug: string;
  name: {
    en: string;
    ar: string;
  };
  headline: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  lifestyle: {
    en: string;
    ar: string;
  };
  heroImage: string;
  gallery: string[];
  propertiesCount: number;
  popularTypes: string[];
  landmarks: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Agent {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  email: string;
  phone: string;
  whatsapp: string;
  image: string;
  experienceYears: number;
  specialization: string;
  languages: string[];
  activeListingsCount: number;
  bio: {
    en: string;
    ar: string;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  shortDescription: {
    en: string;
    ar: string;
  };
  fullDescription: {
    en: string;
    ar: string;
  };
  benefits: {
    en: string[];
    ar: string[];
  };
  iconName: string;
  image: string;
}

export interface FilterState {
  listingType: ListingType | 'all';
  propertyType: string;
  area: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  minArea: number;
  maxArea: number;
  furnishing: string;
  amenities: string[];
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}
