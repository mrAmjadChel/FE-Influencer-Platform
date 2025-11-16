"use client";

import { Edit, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function ProfileHeader({ data: data }: any) {
  const { authData } = useAuth();
  const profile = data.influencerProfiles[0];

  return (
    <div className="sticky top-0 bg-white z-20 border-b p-4 flex items-center gap-4">
      <img
        src={`https://i.pravatar.cc/150?img=${data.id}`}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-semibold">{data.fullName}</h1>
        <p className="text-gray-600 flex items-center gap-1">
          <MapPin size={16} /> {data.city}, {data.country}
        </p>
        <p className="text-gray-600 text-sm">
          {profile.category} • {profile.primaryPlatform}
        </p>
      </div>

      <>
        {(authData?.user.role === "admin" ||
          authData?.user.role === "editor") && (
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white ">
              <Link
                href={`/profile/${data.id}/edit`}
                className="flex items-center gap-1"
              >
                <Edit size={16} /> แก้ไข
              </Link>
            </button>
          )}
      </>
    </div>
  );
}
