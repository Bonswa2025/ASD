import React from 'react';
export function Textarea({className='', ...rest}){
  return <textarea {...rest} className={`border rounded-lg px-3 py-2 text-sm w-full ${className}`} />;
}