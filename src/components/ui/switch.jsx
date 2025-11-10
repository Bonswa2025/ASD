import React from 'react';
export function Switch({checked, onCheckedChange}){
  return <input type="checkbox" role="switch" checked={!!checked} onChange={e=>onCheckedChange?.(e.target.checked)} />;
}
import React from 'react';
export function Switch({checked, onCheckedChange}){
  return (
    <input
      type="checkbox"
      role="switch"
      checked={!!checked}
      onChange={(e)=>onCheckedChange?.(e.target.checked)}
    />
  );
}
