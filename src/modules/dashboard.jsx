import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function Kpi({label, value, hint}){
  return (
    <div className="card" style={{padding:'16px'}}>
      <div style={{fontSize:12, color:'#94a3b8'}}>{label}</div>
      <div style={{fontSize:28, fontWeight:700, marginTop:6}}>{value}</div>
      {hint && <div style={{fontSize:12, color:'#94a3b8', marginTop:6}}>{hint}</div>}
    </div>
  )
}

export default function Dashboard(){
  return (
    <div style={{display:'grid', gap:16}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
        <Kpi label="Actieve medewerkers" value="12" hint="+2 deze week" />
        <Kpi label="Shifts deze week" value="34" hint="3 openstaande" />
        <Kpi label="Foodtruck events" value="7" hint="2 gepland" />
        <Kpi label="Te doen" value="5" hint="Backoffice" />
      </div>

      <Card>
        <CardHeader><CardTitle>Welkom 👋</CardTitle></CardHeader>
        <CardContent>
          <p>Gebruik het menu links om naar <strong>Backoffice</strong> of <strong>Foodtruck manuals</strong> te gaan.</p>
          <p style={{color:'#94a3b8'}}>Deze demo is geschikt voor GitHub → Vercel. Vervang later de demo bestanden met jouw echte code.</p>
        </CardContent>
      </Card>
    </div>
  )
}