export function ContactCard({ data }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold mb-3">Contact</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

        <div>
          <strong>Email:</strong> {data.email}
        </div>

        <div>
          <strong>Phone:</strong> {data.phone}
        </div>

        <div>
          <strong>Languages:</strong> {data.languages}
        </div>

        <div>
          <strong>Last Contact:</strong> {data.lastContactDate?.slice(0, 10)}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <strong>Portfolio:</strong>{" "}
          <a
            href={data.portfolioUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            {data.portfolioUrl}
          </a>
        </div>

      </div>
    </div>
  );
}
