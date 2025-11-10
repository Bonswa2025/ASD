import React from 'react';
export function Dialog({open, onOpenChange, children}){ return open ? <div>{children}</div> : null; }
export function DialogContent({children}){ return <div className="fixed inset-0 bg-black/40 flex items-center justify-center"><div className="bg-white rounded-xl p-4 min-w-[320px]">{children}</div></div>; }
export function DialogHeader({children}){ return <div className="mb-2">{children}</div>; }
export function DialogTitle({children}){ return <div className="font-semibold">{children}</div>; }
export function DialogFooter({children}){ return <div className="mt-3 flex justify-end gap-2">{children}</div>; }
import React from 'react';
export function Dialog({open, onOpenChange, children}){
  if(!open) return null;
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}}
         onClick={() => onOpenChange?.(false)}>
      <div className="card" style={{minWidth:360}} onClick={e=>e.stopPropagation()}>{children}</div>
    </div>
  );
}
export const DialogContent = ({children}) => <div className="card-content">{children}</div>;
export const DialogHeader = ({children}) => <div className="card-header">{children}</div>;
export const DialogTitle = ({children}) => <div className="font-semibold">{children}</div>;
export const DialogFooter = ({children}) => <div className="card-content" style={{display:'flex', justifyContent:'flex-end', gap:8}}>{children}</div>;
