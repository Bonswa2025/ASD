import React from 'react';
export function Textarea({className='', ...rest}){
  return <textarea {...rest} className={`textarea ${className}`} />;
}