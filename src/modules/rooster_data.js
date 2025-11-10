// src/modules/rooster_data.js
export const week = [
  { date:'03-11-2025', dow:'Maandag', shifts:[ {title:'30 x broodjes – Gemeente', who:'Sam', time:'09:00–17:00', tone:'good'} ] },
  { date:'04-11-2025', dow:'Dinsdag', shifts:[ {title:'', who:'Eva', time:'10:00–18:00'} ] },
  { date:'05-11-2025', dow:'Woensdag', shifts:[ {title:'120 x pizza – Prins...', who:'Luca', time:'12:00–20:00'} ] },
  { date:'06-11-2025', dow:'Donderdag', shifts:[ {title:'', who:'—', time:'17:00–23:00'} ] },
  { date:'07-11-2025', dow:'Vrijdag', shifts:[ {title:'200 x friet – Suiker...', who:'Eva', time:'18:00–23:00', tone:'warn'} ] },
  { date:'08-11-2025', dow:'Zaterdag', shifts:[
      {title:'80 x burgers – Stads...', who:'Eva', time:'10:00–18:00'},
      {title:'Borrel – Gemaal', who:'Sam', time:'11:00–19:00', tone:'good'},
      {title:'', who:'Luca', time:'12:00–20:00'},
      {title:'', who:'—', time:'13:00–21:00'}
  ] },
  { date:'09-11-2025', dow:'Zondag', shifts:[
      {title:'Brunch – Pinsa pop-...', who:'Eva', time:'09:00–17:00'},
      {title:'', who:'Sam', time:'12:00–21:00', tone:'good'},
      {title:'', who:'Luca', time:'15:00–22:00'}
  ] },
];

export const uren = [
  { medewerker:'Sam', gepland:'23:15', geregistreerd:'0:00' },
  { medewerker:'Eva', gepland:'27:15', geregistreerd:'0:00' },
  { medewerker:'Luca', gepland:'21:30', geregistreerd:'0:00' },
  { medewerker:'—', gepland:'13:00', geregistreerd:'0:00' },
];
