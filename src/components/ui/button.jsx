import React from 'react'
export function Button({ children, variant='default', size='md', className='', onClick, ...rest }){
  const base = 'inline-flex items-center justify-center rounded-lg transition border';
  const variants = {
    default: 'bg-slate-900 text-white border-slate-900 hover:opacity-90',
    outline: 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent border-transparent hover:bg-slate-100',
    secondary: 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200',
  };
  const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm', icon: 'h-9 w-9 p-0' };
  const cls = `${base} ${variants[variant]||variants.default} ${sizes[size]||sizes.md} ${className}`;
  return <button className={cls} onClick={onClick} {...rest}>{children}</button>
}
export default Button
