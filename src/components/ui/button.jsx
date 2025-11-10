import React from 'react';

export function Button({ children, variant = 'default', className = '', ...rest }) {
  const classes = ['btn'];
  if (variant === 'secondary') classes.push('secondary');
  if (variant === 'destructive') classes.push('destructive');
  if (variant === 'outline') classes.push('outline');
  if (variant === 'ghost') classes.push('ghost');

  return (
    <button className={`${classes.join(' ')} ${className}`} {...rest}>
      {children}
    </button>
  );
}
