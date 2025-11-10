import React, { useState } from 'react'
import Backoffice from '@/modules/backoffice'
import Foodtruck from '@/modules/foodtruck'

export default function App(){
  const [page, setPage] = useState('backoffice')
  return (
    <div style={{fontFamily:'ui-sans-serif, system-ui', background:'#f8fafc', minHeight:'100vh'}}>
      <div style={{display:'flex', gap:8, padding:16, borderBottom:'1px solid #e2e8f0', background:'#fff', position:'sticky', top:0}}>
        <button onClick={()=>setPage('backoffice')} style={{padding:'6px 10px', border:'1px solid #cbd5e1', borderRadius:8, background: page==='backoffice' ? '#334155' : '#fff', color: page==='backoffice' ? '#fff' : '#0f172a'}}>Backoffice</button>
        <button onClick={()=>setPage('foodtruck')} style={{padding:'6px 10px', border:'1px solid #cbd5e1', borderRadius:8, background: page==='foodtruck' ? '#334155' : '#fff', color: page==='foodtruck' ? '#fff' : '#0f172a'}}>Foodtruck</button>
      </div>
      <div style={{padding:16}}>
        {page==='backoffice' ? <Backoffice /> : <Foodtruck />}
      </div>
    </div>
  )
}