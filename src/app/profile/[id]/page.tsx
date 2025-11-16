
import {ProfileHeader} from "@/components/ProfileHeader";
import { BasicInfoCard } from "@/components/BasicInfoCard";
import { ContactCard } from "@/components/ContactCard";
import { MetricsCard } from "@/components/MetricCard";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/people/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to fetch influencer data");
  }

  const data = await res.json();

  const person = data;
  const influencer = data.influencerProfiles?.[0] ?? null;

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6">
        {/* LEFT CONTENT */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-10">
          {/* HEADER */}
          <ProfileHeader data={data} />

          <div className="p-4 space-y-4 overflow-y-auto pb-10">
            <BasicInfoCard data={data} />
            <ContactCard data={data} />
            <MetricsCard data={data} />
          </div>

          {/* METRICS SECTION */}
          {/* {influencer && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-lg font-semibold">{influencer.category}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-500">Primary Platform</p>
                <p className="text-lg font-semibold">
                  {influencer.primaryPlatform}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-lg font-semibold">
                  {influencer.primaryFollowers.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <p className="text-lg font-semibold">
                  {influencer.engagementRate}
                </p>
              </div>
            </div> */}
          {/* )} */}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full md:w-80 bg-white rounded-2xl p-6 shadow-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4">รายละเอียดงานที่ผ่านมา</h2>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            <div className="p-3 bg-gray-100 rounded-lg border">รายการงาน 1</div>
            <div className="p-3 bg-gray-100 rounded-lg border">รายการงาน 2</div>
            <div className="p-3 bg-gray-100 rounded-lg border">รายการงาน 3</div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold rounded-lg transition-all hover:scale-[0.98]">
              ติดต่องาน
            </button>

            <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 font-semibold rounded-lg transition-all hover:scale-[0.98]">
              บันทึกโปรไฟล์
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
