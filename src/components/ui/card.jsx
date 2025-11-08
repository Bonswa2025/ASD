import React from 'react'
export const Card = ({ className='', children }) => <div className={`border rounded-xl bg-white ${className}`}>{children}</div>
export const CardHeader = ({ className='', children }) => <div className={`px-4 py-3 border-b ${className}`}>{children}</div>
export const CardTitle = ({ className='', children }) => <div className={`text-lg font-semibold ${className}`}>{children}</div>
export const CardContent = ({ className='', children }) => <div className={`px-4 py-3 ${className}`}>{children}</div>
export default Card
