import { InfluencerProfile } from "@/types/Interfaces";

type MetricsCardProps = {
  data: {
    influencerProfiles: InfluencerProfile[];
  };
};

export function MetricsCard({ data }: MetricsCardProps) {
  const p = data?.influencerProfiles?.[0];

  if (!p) {
    return (
      <div className="bg-white p-5 rounded-xl shadow">
        <p>No metrics data available.</p>
      </div>
    );
  }

  const engagement = Number(p.engagementRate) * 100;

  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold mb-3">Influencer Metrics</h2>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-sm">

        <div>
          <strong>Primary Platform:</strong> {p.primaryPlatform}
        </div>

        <div>
          <strong>Followers:</strong> {p.primaryFollowers.toLocaleString()}
        </div>

        <div>
          <strong>Total Followers:</strong> {p.totalFollowersCount.toLocaleString()}
        </div>

        <div>
          <strong>Engagement:</strong> {engagement.toFixed(2)}%
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
            {p.engagementRateTier}
          </span>
        </div>

        <div>
          <strong>Secondary Platform:</strong> {p.secondaryPlatform}
        </div>

        <div>
          <strong>Secondary Followers:</strong> {p.secondaryFollowersCount.toLocaleString()}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <strong>Monthly Reach:</strong> {p.averageMonthlyReach.toLocaleString()}
        </div>

      </div>
    </div>
  );
}
