import React, { useState } from 'react'
export function Tabs({ defaultValue, value, onValueChange, children }){
  const [v, setV] = useState(value||defaultValue||''); 
  const ctx = { value: value??v, setValue: (nv)=>{ setV(nv); onValueChange?.(nv);} };
  return <div data-tabs='root'>{React.Children.map(children, ch=>React.isValidElement(ch)?React.cloneElement(ch, { __tabs: ctx }): ch)}</div>
}
export function TabsList({ children }){ return <div className='flex gap-1 mb-2'>{children}</div> }
export function TabsTrigger({ value, __tabs, children }){
  const active = __tabs?.value === value;
  return <button onClick={()=>__tabs.setValue(value)} className={`px-3 py-1.5 rounded border ${active?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-900 border-slate-200'}`}>{children}</button>
}
export function TabsContent({ value, __tabs, children }){ if (__tabs?.value !== value) return null; return <div className='mt-2'>{children}</div> }
export default Tabs
