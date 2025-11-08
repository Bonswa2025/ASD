import React from 'react'
export function DropdownMenu({ children }){ return <div className="relative inline-block">{children}</div> }
export function DropdownMenuTrigger({ asChild=false, children }){ return children }
export function DropdownMenuContent({ align='end', children }){ return <div className="absolute right-0 mt-2 min-w-[12rem] rounded-lg border bg-white shadow z-50 p-2">{children}</div> }
export function DropdownMenuItem({ children, onClick }){ return <button onClick={onClick} className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">{children}</button> }
export function DropdownMenuLabel({ children }){ return <div className="px-3 py-1.5 text-xs uppercase tracking-wide text-slate-500">{children}</div> }
export function DropdownMenuSeparator(){ return <div className="h-px bg-slate-200 my-1" /> }
export default DropdownMenu
