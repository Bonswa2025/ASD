import React from 'react';
export function Button({ children, variant='default', className='', ...rest }){
  const classes = ['btn', variant==='secondary'?'secondary':'', variant==='destructive'?'destructive':''].filter(Boolean).join(' ');
  return <button className={`${classes} ${className}`} {...rest}>{children}</button>;
}