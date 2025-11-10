import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatClock } from '@/modules/klok_module';

export default function Foodtruck(){
  const [startedAt, setStartedAt] = useState(null);
  const [events, setEvents] = useState([]);

  function start(){
    const ts = Date.now();
    setStartedAt(ts);
    setEvents(prev => [...prev, { type:'start', ts }]);
  }
  function stop(){
    const ts = Date.now();
    setStartedAt(null);
    setEvents(prev => [...prev, { type:'stop', ts }]);
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <Card>
        <CardHeader><CardTitle>Handleiding</CardTitle></CardHeader>
        <CardContent>
          <ol style={{paddingLeft:18, lineHeight:1.7}}>
            <li>Zet stroom aan.</li>
            <li>Start kassa.</li>
            <li>Controleer water en gas.</li>
            <li>Open luik en controleer omgeving.</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Klok demo</CardTitle></CardHeader>
        <CardContent>
          <div style={{display:'flex', gap:8}}>
            {!startedAt ? <Button onClick={start}>Start</Button> : <Button variant="secondary" onClick={stop}>Stop</Button>}
          </div>
          <div style={{marginTop:12}}>
            <div style={{fontSize:12, color:'#64748b'}}>Events:</div>
            <ul>
              {events.map((e, i)=>(
                <li key={i}>{e.type} — {formatClock(e.ts)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}