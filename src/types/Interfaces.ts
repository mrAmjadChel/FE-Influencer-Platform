
export interface FilterPanelProps {
  city: string;
  category: string;
  tier: string;
  setCity: (val: string) => void;
  setCategory: (val: string) => void;
  setTier: (val: string) => void;
  cityOptions: string[];
  categoryOptions: string[];
  tierOptions: string[];
}

// types/FormData.ts
export interface FormData {
  // People fields
  type: "INF" | "IND";
  fullName: string;
  preferredName: string;
  gender: string;
  birthDate: string | null;
  email: string;
  phone: string;
  city: string;
  country: string;
  occupation: string;
  interests: string;
  notes: string;
  collaborationStatus: string;
  languages: string;
  lastContactDate: string | null;
  portfolioUrl: string;

  // Influencer fields (INF only)
  category: string;
  primaryPlatform: string;
  primaryFollowers: number | null;
  totalFollowersCount: number | null;
  engagementRate: number | null;
  engagementRateTier: string;
  secondaryPlatform: string;
  secondaryFollowersCount: number | null;
  averageMonthlyReach: number | null;
}

export type InfluencerProfile = {
  id: number;
  peopleId: number;
  category: string;
  primaryPlatform: string;
  primaryFollowers: number;
  totalFollowersCount: number;
  engagementRate: string | number;
  engagementRateTier: string;
  secondaryPlatform: string;
  secondaryFollowersCount: number;
  averageMonthlyReach: number;
};