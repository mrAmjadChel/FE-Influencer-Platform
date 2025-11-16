import { Influencer } from "@/types/Interfaces";

const API_BASE = "http://localhost:3000/api"; // backend URL

export async function getInfluencerById(id: number): Promise<Influencer> {
  const res = await fetch(`${API_BASE}/influencers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch influencer");
  return res.json();
}

export async function updateInfluencer(id: number, data: Partial<Influencer>) {
  const res = await fetch(`${API_BASE}/influencers/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update influencer");
  return res.json();
}
