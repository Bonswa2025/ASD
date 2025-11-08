import React from 'react'
export function Badge({ className='', variant='default', children }){ const base='inline-flex items-center rounded-full px-2 py-0.5 text-xs border'; const variants={ default:'bg-slate-900 text-white border-slate-900', secondary:'bg-slate-100 text-slate-800 border-slate-200' }; return <span className={`${base} ${variants[variant]||variants.default} ${className}`}>{children}</span> }
export default Badge
