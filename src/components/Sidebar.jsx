import { NavLink } from 'react-router-dom'

const items = [
  { to: '/',        label: 'Dashboard' },
  { to: '/rooster', label: 'Rooster' },
  { to: '/manuals', label: 'Manuals' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-slate-200 bg-white">
      <div className="h-16 flex items-center px-4 border-b border-slate-200">
        <div className="text-base font-semibold">ASD</div>
      </div>
      <nav className="p-3 space-y-1">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({isActive}) =>
              `block rounded-lg px-3 py-2 text-sm ${
                isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'
              }`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
