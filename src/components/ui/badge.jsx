import React from 'react';
export function Badge({children, variant='secondary'}){
  const cls = variant==='destructive' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${cls}`} style={{borderColor:'#cbd5e1'}}>{children}</span>;
}