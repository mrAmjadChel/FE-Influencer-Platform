export type Influencer = {
  id: number;
  name: string;
  city: string;
  category: string;
  tier: string;
  followers: number;
  collaboration_status: string;
  notes?: string;
  interests?: string[];
};

export const influencers: Influencer[] = [
  { id: 1, name: "Alice", city: "Bangkok", category: "Fashion", tier: "Gold", followers: 12000, collaboration_status: "Active", notes: "Likes eco products", interests: ["Fashion","Travel"] },
  { id: 2, name: "Bob", city: "Chiang Mai", category: "Tech", tier: "Silver", followers: 8000, collaboration_status: "Inactive", notes: "Prefers tech gadgets", interests: ["Tech","Gaming"] },
  { id: 3, name: "Charlie", city: "Bangkok", category: "Food", tier: "Gold", followers: 15000, collaboration_status: "Active", notes: "", interests: ["Food","Travel"] },
];
