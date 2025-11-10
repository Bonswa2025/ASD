import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmployeeCard from '@/components/EmployeeCard';
import { EmployeesProvider, useEmployees } from '@/components/EmployeesContext';
import { generateWeekSchedule } from '@/modules/rooster_module';

function BackofficePage(){
  const { employees, addEmployee, toggleActive, removeEmployee } = useEmployees();
  const [form, setForm] = useState({ name:'', role:'', phone:'' });
  const schedule = useMemo(()=>generateWeekSchedule(employees.filter(e=>e.active)), [employees]);

  function onSubmit(e){
    e.preventDefault();
    if(!form.name.trim()) return alert('Naam is verplicht');
    addEmployee(form);
    setForm({ name:'', role:'', phone:'' });
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <Card>
        <CardHeader><CardTitle>Medewerkers</CardTitle></CardHeader>
        <CardContent>
          {employees.map(e => (
            <EmployeeCard key={e.id} employee={e} onToggle={toggleActive} onDelete={removeEmployee} />
          ))}
          <form onSubmit={onSubmit} style={{display:'grid', gap:8, marginTop:12}}>
            <Input placeholder="Naam" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <Input placeholder="Rol" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} />
            <Input placeholder="Telefoon" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <Button type="submit">Toevoegen</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Rooster (mock)</CardTitle></CardHeader>
        <CardContent>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr><th style={{textAlign:'left'}}>Dag</th><th style={{textAlign:'left'}}>Shift</th></tr>
            </thead>
            <tbody>
              {schedule.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:'6px 4px', borderTop:'1px solid #e2e8f0'}}>{r.day}</td>
                  <td style={{padding:'6px 4px', borderTop:'1px solid #e2e8f0'}}>{r.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Backoffice(){
  return <EmployeesProvider><BackofficePage /></EmployeesProvider>
}