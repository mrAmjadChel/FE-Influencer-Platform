export function BasicInfoCard({ data }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold mb-3">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

        <div>
          <strong>Preferred:</strong> {data.preferredName}
        </div>

        <div>
          <strong>Gender:</strong> {data.gender}
        </div>

        <div>
          <strong>Birth Date:</strong> {data.birthDate?.slice(0, 10)}
        </div>

        <div>
          <strong>Occupation:</strong> {data.occupation}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <strong>Interests:</strong> {data.interests}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <strong>Notes:</strong> {data.notes}
        </div>

      </div>
    </div>
  );
}
