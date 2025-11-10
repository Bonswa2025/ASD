import React from 'react';
export function Select({value, onValueChange, children}){ return <div data-select>{children}</div>; }
export function SelectTrigger({children, className='', ...rest}){ return <div className={`border rounded-lg px-3 py-2 ${className}`} {...rest}>{children}</div>; }
export function SelectValue(){ return null; }
export function SelectContent({children}){ return <div>{children}</div>; }
export function SelectItem({value, children, onClick}){ return <div onClick={()=>onClick?.(value)}>{children}</div>; }
export default {};