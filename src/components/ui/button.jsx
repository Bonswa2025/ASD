import React from 'react';
export function Button({ children, variant='default', className='', ...rest }){
  const classes = ['btn', variant==='secondary'?'secondary':'', variant==='destructive'?'destructive':''].filter(Boolean).join(' ');
  return <button className={`${classes} ${className}`} {...rest}>{children}</button>;
}
import React from 'react';
export function Button({ children, variant='default', className='', ...rest }){
  const classes = ['btn'];
  if (variant === 'secondary') classes.push('secondary');
  if (variant === 'destructive') classes.push('destructive');
  if (variant === 'outline') classes.push('outline');
  if (variant === 'ghost') classes.push('ghost');
  return <button className={`${classes.join(' ')} ${className}`} {...rest}>{children}</button>;
}
