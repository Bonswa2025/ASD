import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function EmployeeCard({ employee, onToggle, onDelete }){
  if(!employee) return null;
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', border:'1px solid #e2e8f0', borderRadius:12, marginBottom:8, background:'#fff'}}>
      <div>
        <div style={{fontWeight:600}}>{employee.name} <Badge variant={employee.active?'secondary':'destructive'}>{employee.active?'actief':'inactief'}</Badge></div>
        <div style={{fontSize:12, color:'#64748b'}}>{employee.role} &middot; {employee.phone}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <Button variant="secondary" onClick={()=>onToggle?.(employee.id)}>{employee.active?'Deactiveer':'Activeer'}</Button>
        <Button variant="destructive" onClick={()=>onDelete?.(employee.id)}>Verwijder</Button>
      </div>
    </div>
  )
}