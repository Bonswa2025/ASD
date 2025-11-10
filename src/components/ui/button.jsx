import React from 'react';
export function Button({ children, variant='default', className='', ...rest }){
  const base = 'inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm';
  const styles = {
    default: 'bg-slate-900 text-white',
    outline: 'bg-white border',
    secondary: 'bg-slate-100',
    destructive: 'bg-red-600 text-white',
    ghost: 'bg-transparent'
  }[variant] || '';
  return <button className={`${base} ${styles} ${className}`} style={{border:'1px solid #cbd5e1'}} {...rest}>{children}</button>;
}