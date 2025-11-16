import Link from "next/link";
import { X } from "lucide-react";

interface Props {
  influencer: any;
  onRemove?: (id: number) => void;
  userRole?: string;
}

export const InfluencerCard = ({ influencer, onRemove, userRole }: Props) => {
  const profile = influencer.influencerProfile;

  return (
    <div className="relative">
      <Link href={`/profile/${influencer.id}`}>
        <div className="flex flex-col items-center justify-between bg-gray-100 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform">
          {userRole === "admin" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemove?.(influencer.id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              <X size={16} className="text-gray-800" />
            </button>
          )}

          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full border-2 border-orange-400 p-1"
              src={`https://i.pravatar.cc/150?img=${influencer.id}`}
              alt={influencer.fullName}
            />
            <h3 className="text-xl font-semibold mt-3">{influencer.fullName}</h3>
            <div className="text-gray-700 mt-2 text-center">
              <p>{profile?.category}</p>
              <p>{influencer.city}</p>
              <p>
                {profile?.primaryPlatform} - {profile?.primaryFollowers?.toLocaleString()} followers
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
              ติดต่องาน
            </button>
            <button className="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition">
              บันทึกโปรไฟล์
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
