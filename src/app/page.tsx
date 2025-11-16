"use client";

import { useEffect, useState } from "react";
import { FilterPanel } from "../components/FilterPanel";
import { InfluencerCard } from "../components/InfluencerCard";
import { useAuth } from "../context/AuthContext";
import { ConfirmModal } from "../components/ConfirmModal";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function HomePage() {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { authData } = useAuth();

  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [tier, setTier] = useState("");

  // Fetch People type = INF
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/people?type=INF`,
          { next: { revalidate: 10 } }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch data");
        }

        const data = await res.json();
        setPeople(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Delete profile
  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete person");
      }

      setPeople((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const requestRemove = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmRemove = async () => {
    if (!selectedId) return;
    await handleRemove(selectedId);
    setShowConfirm(false);
    setSelectedId(null);
  };

  // Extract options
  const cityOptions = Array.from(new Set(people.map((p) => p.city)));

  const categoryOptions = Array.from(
    new Set(
      people.flatMap((p) => p.influencerProfiles).map((prof) => prof?.category)
    )
  );

  const tierOptions = Array.from(
    new Set(
      people
        .flatMap((p) => p.influencerProfiles)
        .map((prof) => prof?.engagementRateTier)
    )
  );

  // Filtering
  const filteredPeople = people.filter((p) => {
    const profile = p.influencerProfiles?.[0]; // 1:1 ใช้อันแรก

    return (
      (city ? p.city === city : true) &&
      (category ? profile?.category === category : true) &&
      (tier ? profile?.engagementRateTier === tier : true)
    );
  });

  if (loading) return <p className="p-6 m-auto text-center">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header: Title + Create Button */}
          <div className="flex justify-end mb-4">
            {(authData?.user.role === "admin" ||
              authData?.user.role === "editor") && (
              <Link
                href="/profile/create"
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Plus size={16} />
                เพิ่มโปรไฟล์
              </Link>
            )}
          </div>

          {/* Main */}
          <div className="flex flex-col lg:flex-row flex-1 gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="p-3 sticky top-0">
                <FilterPanel
                  city={city}
                  category={category}
                  tier={tier}
                  setCity={setCity}
                  setCategory={setCategory}
                  setTier={setTier}
                  cityOptions={cityOptions}
                  categoryOptions={categoryOptions}
                  tierOptions={tierOptions}
                />
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide max-h-[calc(100vh-5rem)]">
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPeople.map((person) => (
                  <InfluencerCard
                    key={person.id}
                    influencer={person}
                    onRemove={requestRemove}
                    userRole={authData?.user.role}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* Confirm Modal */}
        <ConfirmModal
          open={showConfirm}
          onConfirm={confirmRemove}
          onCancel={() => setShowConfirm(false)}
          title="ยืนยันการลบ"
          message="คุณแน่ใจหรือไม่ว่าต้องการลบโปรไฟล์นี้?"
        />
      </div>
    </div>
  );
}
