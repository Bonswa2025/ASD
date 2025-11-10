import React from 'react';
export function Button({ children, variant='default', className='', ...rest }){
  const base = 'inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm';
  const styles = {
    default: 'bg-slate-900 text-white hover:opacity-90',
    outline: 'bg-white border hover:bg-slate-50',
    secondary: 'bg-slate-100 hover:bg-slate-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent hover:bg-slate-100'
  }[variant] || '';
  return <button className={`${base} ${styles} ${className}`} {...rest}>{children}</button>;
}