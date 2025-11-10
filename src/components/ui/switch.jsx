import React from 'react';

export function Switch({ checked, onCheckedChange, className = '', ...rest }) {
  return (
    <input
      type="checkbox"
      role="switch"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={className}
      {...rest}
    />
  );
}
