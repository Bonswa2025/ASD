import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Dashboard(){
  return (
    <div style={{display:'grid', gap:16}}>
      <Card>
        <CardHeader><CardTitle>Welkom 👋</CardTitle></CardHeader>
        <CardContent>
          <p>Gebruik het menu links om naar <strong>Backoffice</strong> of <strong>Foodtruck manuals</strong> te gaan.</p>
          <p>Je kunt deze pagina later vervangen door KPI's, statussen of een overzicht van acties.</p>
        </CardContent>
      </Card>
    </div>
  )
}