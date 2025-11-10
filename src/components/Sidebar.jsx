import { NavLink } from 'react-router-dom'


const nav = [
{ to: '/', label: 'Dashboard', icon: (
<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M3 12l9-9 9 9" stroke="currentColor" strokeWidth="2"/><path d="M9 21V9h6v12" stroke="currentColor" strokeWidth="2"/></svg>
)},
{ to: '/rooster', label: 'Rooster', icon: (
<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2"/></svg>
)},
{ to: '/rapporten', label: 'Rapporten', icon: (
<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2"/><path d="M8 14l3 3 5-7" stroke="currentColor" strokeWidth="2"/></svg>
)},
]


export default function Sidebar() {
return (
<aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
<div className="h-16 flex items-center gap-2 px-4 border-b">
<div className="h-9 w-9 rounded-xl bg-primary-600 text-white grid place-items-center font-bold">A</div>
<div className="font-semibold">ASD</div>
</div>
<nav className="flex-1 p-3">
<ul className="space-y-1">
{nav.map(item => (
<li key={item.to}>
<NavLink
to={item.to}
className={({ isActive }) => `
group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium
${isActive ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200' : 'text-slate-700 hover:bg-slate-100'}
`}
>
<span className="text-slate-500 group-[.active]:text-primary-700">{item.icon}</span>
<span>{item.label}</span>
</NavLink>
</li>
))}
</ul>
</nav>
<div className="p-3 border-t">
<button className="btn-ghost w-full justify-center">Uitloggen</button>
</div>
</aside>
)
}
