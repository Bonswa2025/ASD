export default function Header({ title = 'Overzicht', onMenu }) {
return (
<header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
<div className="h-full flex items-center gap-3 px-4">
<button className="md:hidden btn-ghost -ml-2" onClick={onMenu} aria-label="Menu">☰</button>
<h1 className="text-lg sm:text-xl font-semibold text-slate-800">{title}</h1>
<div className="ml-auto flex items-center gap-2">
<input className="hidden sm:block rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200" placeholder="Zoeken…" />
<button className="btn-ghost">Help</button>
</div>
</div>
</header>
)
}
