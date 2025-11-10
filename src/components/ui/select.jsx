import React from 'react';
export function Select({value, onValueChange, children}){ return <div data-select>{children}</div>; }
export function SelectTrigger({children, className='', ...rest}){ return <div className={`border rounded-lg px-3 py-2 ${className}`} {...rest}>{children}</div>; }
export function SelectValue(){ return null; }
export function SelectContent({children}){ return <div>{children}</div>; }
export function SelectItem({value, children, onClick}){ return <div onClick={()=>onClick?.(value)}>{children}</div>; }
export default {};
import React, {createContext, useContext} from 'react';

const Ctx = createContext(null);

export function Select({value, onValueChange, children}){
  return <Ctx.Provider value={{value, onValueChange}}>{children}</Ctx.Provider>;
}

export function SelectTrigger({children, className='', ...rest}){
  return <div className={`input ${className}`} {...rest} style={{cursor:'pointer'}}>{children}</div>;
}
export function SelectValue(){ return null; }

export function SelectContent({children}){ 
  return <div style={{marginTop:6, border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', background:'#0b1220'}}>{children}</div>; 
}

export function SelectItem({value, children}){
  const ctx = useContext(Ctx);
  const active = ctx?.value === value;
  return (
    <div
      onClick={()=>ctx?.onValueChange?.(value)}
      style={{
        padding:'8px 12px', borderBottom:'1px solid var(--border)',
        background: active ? 'rgba(110,231,183,.12)' : 'transparent', cursor:'pointer'
      }}
    >
      {children}
    </div>
  );
}
