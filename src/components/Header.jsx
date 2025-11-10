export default function Header({ title = '' }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white">
      <div className="h-full flex items-center justify-between px-4">
        <h1 className="text-[17px] font-semibold">{title}</h1>
        <div className="hidden sm:flex items-center gap-2">
          <input
            placeholder="Zoeken…"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
          <button className="btn-ghost">Help</button>
        </div>
      </div>
    </header>
  )
}
