import React from 'react';

export function Badge({ children, variant = 'secondary', className = '', ...rest }) {
  let cls = 'badge';
  if (variant === 'destructive') cls += ' destructive';
  if (variant === 'outline') cls += ' outline';
  return (
    <span className={`${cls} ${className}`} {...rest}>
      {children}
    </span>
  );
}
