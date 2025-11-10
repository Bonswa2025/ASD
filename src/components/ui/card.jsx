import React from 'react';
export function Card({ className='', children }) {
  return <div className={`rounded-2xl border shadow-sm bg-white ${className}`}>{children}</div>;
}
export function CardHeader({ children, className='' }){
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}
export function CardTitle({ children, className='' }){
  return <div className={`font-semibold ${className}`}>{children}</div>;
}
export function CardContent({ children, className='' }){
  return <div className={`p-4 ${className}`}>{children}</div>;
}