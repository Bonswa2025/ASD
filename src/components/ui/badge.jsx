import React from 'react';
export function Badge({children, variant='secondary'}){
  const cls = variant==='destructive' ? 'badge destructive' : 'badge';
  return <span className={cls}>{children}</span>;
}