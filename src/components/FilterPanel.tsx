import { FilterPanelProps } from "@/types/Interfaces";

export function FilterPanel({
  city,
  category,
  tier,
  setCity,
  setCategory,
  setTier,
  cityOptions,
  categoryOptions,
  tierOptions,
}: FilterPanelProps) {
  const baseSelectClasses =
    " bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
   <aside className="w-64 bg-gray-50 p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Filters</h2>

  <div className="flex flex-col gap-4">
    {/* City */}
    <div className="relative">
      <label className="block text-gray-600 mb-1 font-medium">City</label>
      <select
        className={baseSelectClasses + " w-full pr-8"}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">All Cities</option>
        {cityOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>

    {/* Category */}
    <div className="relative">
      <label className="block text-gray-600 mb-1 font-medium">Category</label>
      <select
        className={baseSelectClasses + " w-full pr-8"}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categoryOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>

    {/* Tier */}
    <div className="relative">
      <label className="block text-gray-600 mb-1 font-medium">Tier</label>
      <select
        className={baseSelectClasses + " w-full pr-8"}
        value={tier}
        onChange={(e) => setTier(e.target.value)}
      >
        <option value="">All Tiers</option>
        {tierOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  </div>
</aside>

  );
}
