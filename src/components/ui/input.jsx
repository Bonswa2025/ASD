import React from 'react'
export function Input({ className='', ...rest }){ return <input className={`h-9 px-3 border rounded-lg outline-none focus:ring focus:ring-slate-200 ${className}`} {...rest} /> }
export default Input
