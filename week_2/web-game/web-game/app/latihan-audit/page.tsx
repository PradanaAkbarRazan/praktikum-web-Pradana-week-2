export default function LatihanAudit() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Katalog Alat Laboratorium</h1>
      <img src="/next.svg" alt="Logo Next.js" width={120} height={24} />
      <p className="text-gray-700">Stok diperbarui setiap hari.</p>
      <form role="search" aria-label="Pencarian alat laboratorium" className="mt-4 flex max-w-lg items-end gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="cari-alat" className="font-medium text-gray-900">Cari alat</label>
          <input id="cari-alat" name="q" type="search" className="min-w-0 rounded border border-gray-500 p-2 text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
        </div>
        <button type="submit" aria-label="Cari" className="rounded border border-gray-600 p-2 text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5" stroke="currentColor" fill="none" />
          </svg>
        </button>
      </form>
    </main>
  );
}
