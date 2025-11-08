import React, { useState } from 'react'
export function Select({ value, onValueChange, children }){ 
  const [open, setOpen] = useState(false); 
  return <div data-select='root'>{React.Children.map(children, ch=>React.isValidElement(ch)?React.cloneElement(ch, { __sel:{ value, onValueChange, open, setOpen } }): ch)}</div>;
}
export function SelectTrigger({ __sel, children }){ return <button onClick={()=>__sel.setOpen(!__sel.open)} className='h-9 px-3 border rounded-lg'>{children}</button> }
export function SelectValue({ children }){ return <span>{children}</span> }
export function SelectContent({ __sel, children }){ if(!__sel.open) return null; return <div className='mt-1 border rounded-lg bg-white p-1 shadow'>{children}</div> }
export function SelectItem({ value, __sel, children }){ return <div className='px-3 py-1 hover:bg-slate-100 rounded cursor-pointer' onClick={()=>{ __sel.onValueChange?.(value); __sel.setOpen(false); }}>{children}</div> }
export default Select
