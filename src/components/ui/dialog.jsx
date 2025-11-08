import React from 'react'
export function Dialog({ children }){ return <div>{children}</div> }
export function DialogContent({ children }){ return <div className='fixed inset-0 bg-black/30 flex items-center justify-center'><div className='bg-white rounded-xl p-4 min-w-[320px]'>{children}</div></div> }
export function DialogHeader({ children }){ return <div className='mb-2'>{children}</div> }
export function DialogTitle({ children }){ return <div className='text-lg font-semibold'>{children}</div> }
export function DialogFooter({ children }){ return <div className='mt-3 flex justify-end gap-2'>{children}</div> }
export default Dialog
