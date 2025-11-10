import AppLayout from '../layouts/AppLayout'

export default function RoosterPage() {
  return (
    <AppLayout title="Rooster">
      <div className="grid gap-6">

        {/* 🔹 Balk bovenaan met knoppen */}
        <div className="card flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost">Filters</button>
            <button className="btn-ghost">Concepten</button>
            <button className="btn-ghost">Locaties</button>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost">Vandaag</button>
            <button className="btn-primary">Dienst toevoegen</button>
          </div>
        </div>

        {/* 🔹 Hier komt het weekschema */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-600">
              Week 45 · 03-11-2025 – 09-11-2025
            </div>
            <div className="inline-flex rounded-xl border overflow-hidden">
              <button className="px-3 py-1.5 text-sm hover:bg-slate-50">Dag</button>
              <button className="px-3 py-1.5 text-sm bg-primary-600 text-white">Week</button>
              <button className="px-3 py-1.5 text-sm hover:bg-slate-50">Maand</button>
            </div>
          </div>

          {/* 1 voorbeeld-dag (je kan er meer maken) */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            <div className="rounded-xl border bg-white">
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <div>
                  <div className="text-xs text-slate-500">03-11-2025</div>
                  <div className="text-sm font-semibold">Maandag</div>
                </div>
                <span className="badge-success">3</span>
              </div>
              <div className="p-3 space-y-2 text-sm">
                <div className="rounded-lg border px-2 py-1 flex items-center justify-between">
                  <span>09:00–17:00 · Sam</span>
                  <span className="h-2 w-2 rounded-full bg-success-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Tabel met uren */}
        <div className="card">
          <div className="mb-3 text-base font-semibold">Urenregistratie – deze week</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="py-2 pr-4">Medewerker</th>
                  <th className="py-2 pr-4">Gepland</th>
                  <th className="py-2 pr-4">Geregistreerd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4">Sam</td>
                  <td className="py-2 pr-4">23:15</td>
                  <td className="py-2 pr-4">0:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
