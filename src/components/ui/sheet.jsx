import React from 'react'
export function Sheet({ children }){ return <div>{children}</div> }
export function SheetTrigger({ asChild=false, children }){ return children }
export function SheetContent({ side='left', className='', children }){ return <div className={className}>{children}</div> }
export default Sheet
