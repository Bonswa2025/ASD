import React from 'react'
export function Label({children, className='', ...rest}){ return <label className={`text-sm text-slate-700 ${className}`} {...rest}>{children}</label> }
export default Label
