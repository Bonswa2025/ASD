import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'


export default function AppLayout({ title, children }) {
const [open, setOpen] = useState(false)
return (
<div className="min-h-screen bg-slate-50 text-slate-800">
{/* Mobile sheet */}
{open && (
<div className="fixed inset-0 z-50 md:hidden">
<div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
<div className="absolute inset-y-0 left-0 w-80 bg-white shadow-xl p-2">
<Sidebar />
</div>
</div>
)}


<div className="flex">
<Sidebar />
<div className="flex-1 min-w-0">
<Header title={title} onMenu={() => setOpen(true)} />
<main className="container-page">
{children}
</main>
</div>
</div>
</div>
)
}
