// app/event-bestellingen/page.tsx
// "Event Bestellingen" – lichte, Vercel-ready module (zonder extra libs)
// - Werkt met Next.js App Router en shadcn/ui
// - Geen extra dependencies nodig
// - Data blijft lokaal in localStorage
// - Opties per concept kunnen procentueel verdeeld worden; tabel rekent uit wat je nodig hebt

'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ---------------------------------------------
// Helpers & constants
// ---------------------------------------------
const colors = ['#7dd3fc', '#86efac', '#fde68a', '#fca5a5', '#c4b5fd', '#99f6e4', '#f9a8d4'];
const uid = () => Math.random().toString(36).slice(2, 9);
const labelForKey = (key: string) => (key === 'parmeTruff' ? 'Parme/Truff' : key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()));

const LS_CONCEPTS = 'eb_concepts_v1';
const LS_EVENT_NAME = 'eb_event_name_v1';
const LS_INSTANCES = 'eb_instances_v1';

// ---------------------------------------------
// Types
// ---------------------------------------------
export type Item = {
  id: string;
  name: string;
  unit: string;
  basePer100: number; // hoeveel per 100 personen
};

export type Categories = Record<string, Item[]>; // basis + optioneel (sleutels)

export type Concept = {
  id: string;
  name: string;
  color: string;
  categories: Categories; // { basis: Item[], ...opties }
};

export type Instance = {
  conceptId: string;
  people: number; // aantal personen voor dit concept
  enabledOptions: Record<string, boolean>; // welke optiecategorieën aanstaan
  optionWeights: Record<string, number>; // verdeling in % van de aanstaande opties
};

function computeScaledQty(basePer100: number, people: number) {
  const raw = (people / 100) * (basePer100 || 0);
  return { raw, shown: Math.ceil(raw) };
}

// ---------------------------------------------
// Default data (voorbeeld)
// ---------------------------------------------
const defaultConcepts: Concept[] = [
  {
    id: 'concept-gemaal',
    name: 'Gemaal',
    color: '#7dd3fc',
    categories: {
      basis: [
        { id: uid(), name: 'Friet', unit: 'doos', basePer100: 3 },
        { id: uid(), name: 'Mayonaise', unit: 'emmer', basePer100: 0.6 },
        { id: uid(), name: 'Ketchup', unit: 'emmer', basePer100: 0.3 },
        { id: uid(), name: 'Curry', unit: 'emmer', basePer100: 0.2 },
        { id: uid(), name: 'A13 bakjes', unit: 'stuks', basePer100: 100 },
      ],
      parmeTruff: [
        { id: uid(), name: 'Parmezaan', unit: 'kg', basePer100: 1 },
        { id: uid(), name: 'Truffel mayonaise', unit: 'emmer', basePer100: 1 },
        { id: uid(), name: 'Gehakte peterselie', unit: 'zak', basePer100: 1 },
      ],
      loadedKip: [
        { id: uid(), name: 'Hete kip (gaar)', unit: 'kg', basePer100: 3 },
        { id: uid(), name: 'Sriracha mayo', unit: 'emmer', basePer100: 1 },
      ],
    },
  },
  {
    id: 'concept-pinsa',
    name: 'Pinsa',
    color: '#86efac',
    categories: {
      basis: [
        { id: uid(), name: 'Pinsa bodem', unit: 'doos', basePer100: 3 },
        { id: uid(), name: 'Pizza saus mutti', unit: 'blik', basePer100: 8 },
        { id: uid(), name: 'Pizza kaas', unit: 'kg', basePer100: 7 },
      ],
      caprese: [
        { id: uid(), name: 'Mozzarella', unit: 'kg', basePer100: 2 },
        { id: uid(), name: 'Pesto', unit: 'kg', basePer100: 1 },
        { id: uid(), name: 'Tomaat (plak)', unit: 'kg', basePer100: 2 },
      ],
    },
  },
];

// ---------------------------------------------
// Subcomponent: ConceptEditor
// ---------------------------------------------
function ConceptEditor({
  concept,
  instance,
  onChange,
  isAdmin,
  colorIdx,
}: {
  concept: Concept;
  instance: Instance;
  onChange: (next: Instance) => void;
  isAdmin: boolean;
  colorIdx: number;
}) {
  const optionKeys = useMemo(() => Object.keys(concept.categories || {}).filter((k) => k !== 'basis'), [concept]);
  const enabledOptions = instance.enabledOptions || {};
  const optionWeights = instance.optionWeights || {};

  // Zorg dat alle optiekoppen in state bestaan
  useEffect(() => {
    const nextEnabled = { ...enabledOptions } as Record<string, boolean>;
    const nextWeights = { ...optionWeights } as Record<string, number>;
    optionKeys.forEach((k) => {
      if (!(k in nextEnabled)) nextEnabled[k] = false;
      if (!(k in nextWeights)) nextWeights[k] = 0;
    });
    if (JSON.stringify(nextEnabled) !== JSON.stringify(enabledOptions) || JSON.stringify(nextWeights) !== JSON.stringify(optionWeights)) {
      onChange({ ...instance, enabledOptions: nextEnabled, optionWeights: nextWeights });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concept.id]);

  // normaliseer verdelingen naar 100%
  const normalizedWeights = useMemo(() => {
    const on = optionKeys.filter((k) => enabledOptions[k]);
    if (!on.length) return {} as Record<string, number>;
    const w: Record<string, number> = {};
    on.forEach((k) => (w[k] = Number((optionWeights[k] ?? 0).toFixed(2))));
    const sum = Object.values(w).reduce((a, b) => a + b, 0);
    const diff = Number((100 - sum).toFixed(2));
    if (Math.abs(diff) > 0.01) {
      const fix = on[0];
      w[fix] = Number(((w[fix] ?? 0) + diff).toFixed(2));
    }
    return w;
  }, [optionKeys, enabledOptions, optionWeights]);

  const items = useMemo(() => {
    const basis = concept.categories?.basis || [];
    const enabled = Object.keys(normalizedWeights);
    const combined: (Item & { __adjBasePer100?: number })[] = [
      ...basis.map((i) => ({ ...i, __adjBasePer100: i.basePer100 })),
    ];
    enabled.forEach((k) => {
      const catItems = concept.categories?.[k] || [];
      const pct = Number(normalizedWeights[k]) || 0;
      catItems.forEach((i) =>
        combined.push({ ...i, __adjBasePer100: (i.basePer100 || 0) * (pct / 100) })
      );
    });
    return combined;
  }, [concept, normalizedWeights]);

  const enabledKeys = optionKeys.filter((k) => enabledOptions[k]);
  const enabledWithPerc = enabledKeys.map((k, i) => ({ key: k, pct: Number(optionWeights[k] || 0), color: colors[(colorIdx + i) % colors.length] }));

  const equalize = () => {
    const on = optionKeys.filter((k) => enabledOptions[k]);
    if (!on.length) return;
    if (on.length === 1) return onChange({ ...instance, optionWeights: { ...optionWeights, [on[0]]: 100 } });
    const even = Number((100 / on.length).toFixed(2));
    const next = { ...optionWeights } as Record<string, number>;
    on.forEach((k) => (next[k] = even));
    const sum = on.reduce((a, k) => a + (Number(next[k]) || 0), 0);
    const diff = Number((100 - sum).toFixed(2));
    if (Math.abs(diff) > 0.01) {
      const fix = on[0];
      next[fix] = Number(((Number(next[fix]) || 0) + diff).toFixed(2));
    }
    optionKeys.filter((k) => !enabledOptions[k]).forEach((k) => (next[k] = 0));
    onChange({ ...instance, optionWeights: next });
  };

  const setWeightLocked = (targetKey: string, vRaw: number) => {
    const on = optionKeys.filter((k) => enabledOptions[k]);
    if (!on.length) return;
    const v = Math.max(0, Math.min(100, Number(vRaw) || 0));
    if (on.length === 1) return onChange({ ...instance, optionWeights: { ...optionWeights, [on[0]]: 100 } });
    const next = { ...optionWeights, [targetKey]: v } as Record<string, number>;
    const others = on.filter((k) => k !== targetKey);
    let remaining = 100 - v;
    let totalOthers = others.reduce((acc, k) => acc + (Number(optionWeights[k]) || 0), 0);
    if (totalOthers <= 0) {
      const even = Number((remaining / others.length).toFixed(2));
      others.forEach((k) => (next[k] = even));
    } else {
      let assigned = 0;
      others.forEach((k, idx) => {
        if (idx === others.length - 1) next[k] = Number((remaining - assigned).toFixed(2));
        else {
          const share = (Number(optionWeights[k]) || 0) / totalOthers;
          const val = Number((remaining * share).toFixed(2));
          next[k] = val;
          assigned += val;
        }
      });
    }
    const sum = on.reduce((a, k) => a + (Number(next[k]) || 0), 0);
    const diff = Number((100 - sum).toFixed(2));
    if (Math.abs(diff) > 0.01) {
      const fix = others[0] ?? targetKey;
      next[fix] = Number(((Number(next[fix]) || 0) + diff).toFixed(2));
    }
    optionKeys.filter((k) => !enabledOptions[k]).forEach((k) => (next[k] = 0));
    onChange({ ...instance, optionWeights: next });
  };

  return (
    <Card className="mb-4 border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800">{concept.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Personen */}
        <div className="grid grid-cols-12 items-center gap-3">
          <Label className="col-span-12 md:col-span-3 md:text-right">Aantal personen</Label>
          <div className="col-span-12 md:col-span-9">
            <Input
              type="number"
              min={0}
              value={instance.people ?? 0}
              onChange={(e) => onChange({ ...instance, people: Math.max(0, parseInt(e.target.value || '0', 10)) })}
              className="max-w-[220px]"
            />
          </div>
        </div>

        {/* Opties */}
        {optionKeys.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <p className="text-slate-700 mb-2 font-medium">Optionele gerechten</p>
            <div className="flex flex-wrap gap-4">
              {optionKeys.map((key) => (
                <Label key={key} className="flex items-center gap-2 text-slate-700">
                  <Checkbox
                    checked={!!enabledOptions[key]}
                    onCheckedChange={(v) => onChange({ ...instance, enabledOptions: { ...enabledOptions, [key]: !!v } })}
                  />
                  {labelForKey(key)}
                </Label>
              ))}
            </div>
          </div>
        )}

        {/* Verdeling */}
        {enabledKeys.length > 0 && (
          <div className="rounded-xl border p-3 bg-white/70">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <div className="flex flex-wrap gap-2">
                {enabledWithPerc.map(({ key, pct, color }) => (
                  <span key={key} className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-indigo-50">
                    <span style={{ background: color }} className="h-2.5 w-2.5 rounded" />
                    {labelForKey(key)}: <b>{Math.round(pct)}%</b>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={equalize} className="border-slate-300">
                  Gelijk verdelen
                </Button>
              </div>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 mb-3 flex">
              {enabledWithPerc.map(({ key, pct, color }) => (
                <div key={key} className="h-full" style={{ width: `${pct}%`, background: color }} />
              ))}
            </div>
            <div className="space-y-3">
              {enabledKeys.map((key, i) => (
                <div key={key} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-4 text-sm text-slate-700">{labelForKey(key)}</div>
                  <div className="col-span-7">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={Number(optionWeights[key] || 0)}
                      onChange={(e) => setWeightLocked(key, Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: colors[(colorIdx + i) % colors.length] }}
                    />
                  </div>
                  <div className="col-span-1 text-right text-sm tabular-nums">{Math.round(Number(optionWeights[key] || 0))}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabel */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
              <tr>
                <th className="text-left px-3 py-2">Product</th>
                <th className="text-right px-3 py-2">Eenheid</th>
                <th className="text-right px-3 py-2">Basis (per 100)</th>
                <th className="text-right px-3 py-2">Benodigd</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const { shown } = computeScaledQty(item.__adjBasePer100 ?? item.basePer100, instance.people);
                return (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-800">{item.name}</td>
                    <td className="text-right px-3 py-2 text-slate-700">{item.unit}</td>
                    <td className="text-right px-3 py-2 text-slate-700">
                      {(item.__adjBasePer100 ?? item.basePer100).toFixed ? (
                        (item.__adjBasePer100 ?? item.basePer100).toFixed(2)
                      ) : (
                        item.__adjBasePer100 ?? item.basePer100
                      )}
                    </td>
                    <td className="text-right px-3 py-2 text-slate-800 font-medium">
                      {shown} {item.unit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------
// Page component
// ---------------------------------------------
export default function Page() {
  // Concepts
  const [concepts, setConcepts] = useState<Concept[]>(() => {
    try {
      const s = localStorage.getItem(LS_CONCEPTS);
      return s ? (JSON.parse(s) as Concept[]) : defaultConcepts;
    } catch {
      return defaultConcepts;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(LS_CONCEPTS, JSON.stringify(concepts));
    } catch {}
  }, [concepts]);

  // Event-naam
  const [eventName, setEventName] = useState<string>(() => localStorage.getItem(LS_EVENT_NAME) || 'Nieuw evenement');
  useEffect(() => {
    localStorage.setItem(LS_EVENT_NAME, eventName);
  }, [eventName]);

  // Instances per concept (alleen voor geactiveerde concepten)
  const [instancesById, setInstancesById] = useState<Record<string, Instance>>(() => {
    try {
      const raw = localStorage.getItem(LS_INSTANCES);
      const parsed = raw ? (JSON.parse(raw) as Record<string, Instance>) : {};
      return parsed;
    } catch {
      return {} as Record<string, Instance>;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(LS_INSTANCES, JSON.stringify(instancesById));
    } catch {}
  }, [instancesById]);

  const activeConceptIds = useMemo(() => Object.keys(instancesById), [instancesById]);
  const isActive = (id: string) => activeConceptIds.includes(id);

  const toggleConcept = (conceptId: string) => {
    setInstancesById((prev) => {
      const next = { ...prev } as Record<string, Instance>;
      if (next[conceptId]) delete next[conceptId];
      else next[conceptId] = { conceptId, people: 0, enabledOptions: {}, optionWeights: {} };
      return next;
    });
  };

  const updateInstance = (conceptId: string, patch: Instance) =>
    setInstancesById((prev) => ({ ...prev, [conceptId]: patch }));

  const totalPeople = useMemo(() => activeConceptIds.reduce((a, cid) => a + Number(instancesById[cid]?.people ?? 0), 0), [activeConceptIds, instancesById]);

  // Aggregatie over alle actieve concepten
  const detailedPerConcept = useMemo(() => {
    return activeConceptIds.map((cid) => {
      const inst = instancesById[cid];
      const concept = concepts.find((c) => c.id === cid);
      if (!concept) return { conceptId: cid, conceptName: 'Onbekend', people: inst?.people || 0, items: [] as any[] };

      const optionKeys = Object.keys(concept.categories || {}).filter((k) => k !== 'basis');
      const on = optionKeys.filter((k) => inst?.enabledOptions?.[k]);

      const weights: Record<string, number> = {};
      if (on.length) {
        on.forEach((k) => (weights[k] = Number((Number(inst?.optionWeights?.[k]) || 0).toFixed(2))));
        const sum = Object.values(weights).reduce((a, b) => a + b, 0);
        const diff = Number((100 - sum).toFixed(2));
        if (Math.abs(diff) > 0.01) {
          const fix = on[0];
          weights[fix] = Number(((weights[fix] || 0) + diff).toFixed(2));
        }
      }

      const list: { id: string; name: string; unit: string; basePer100: number; source: { concept: string; category: string } }[] = [];
      const basis = concept.categories?.basis || [];
      basis.forEach((i) => list.push({ id: i.id, name: i.name, unit: i.unit, basePer100: i.basePer100, source: { concept: concept.name, category: 'basis' } }));

      Object.keys(weights).forEach((k) => {
        const pct = Number(weights[k]) || 0;
        (concept.categories?.[k] || []).forEach((i) =>
          list.push({ id: i.id, name: i.name, unit: i.unit, basePer100: (i.basePer100 || 0) * (pct / 100), source: { concept: concept.name, category: k } })
        );
      });

      const scaled = list.map((row) => {
        const { raw, shown } = computeScaledQty(row.basePer100, inst?.people || 0);
        return { ...row, qtyRaw: raw, qtyShown: shown };
      });

      return { conceptId: cid, conceptName: concept.name, people: inst?.people || 0, items: scaled };
    });
  }, [activeConceptIds, instancesById, concepts]);

  const aggregated = useMemo(() => {
    const map = new Map<string, { name: string; unit: string; qtyRaw: number }>();
    detailedPerConcept.forEach((block) => {
      block.items.forEach((it) => {
        const key = `${it.name}||${it.unit}`;
        if (!map.has(key)) map.set(key, { name: it.name, unit: it.unit, qtyRaw: 0 });
        const rec = map.get(key)!;
        rec.qtyRaw += it.qtyRaw;
      });
    });
    const rows = Array.from(map.values()).map((r) => ({ ...r, qtyShown: Math.ceil(r.qtyRaw) }));
    rows.sort((a, b) => a.name.localeCompare(b.name) || a.unit.localeCompare(b.unit));
    return rows;
  }, [detailedPerConcept]);

  // Tabs
  const [activeTab, setActiveTab] = useState<string>('totaal');
  useEffect(() => {
    if (activeTab !== 'totaal' && !activeConceptIds.includes(activeTab)) setActiveTab(activeConceptIds[0] || 'totaal');
  }, [activeConceptIds, activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-6xl bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 border border-slate-200">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Event Bestellingen</h1>
          <div className="flex items-center gap-3">
            <Label className="text-sm text-slate-600">Event</Label>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} className="max-w-sm" />
          </div>
        </header>

        {/* Concept selectie */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-slate-800">Concepten kiezen</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {concepts.map((c) => (
              <label key={c.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={isActive(c.id)}
                  onChange={() => toggleConcept(c.id)}
                />
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded" style={{ background: c.color }} />
                  {c.name}
                </span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 flex flex-wrap gap-2">
            <TabsTrigger value="totaal">Totaal overzicht</TabsTrigger>
            {activeConceptIds.map((cid) => (
              <TabsTrigger key={cid} value={cid}>
                {concepts.find((c) => c.id === cid)?.name || 'Concept'}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Totaal tab */}
          <TabsContent value="totaal">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-slate-800">Samenvatting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-slate-700">
                  <div>
                    <span className="text-sm">Totaal personen</span>
                    <div className="text-xl font-semibold">{totalPeople}</div>
                  </div>
                  <div className="text-sm text-slate-500">{activeConceptIds.length} actieve concept(en)</div>
                </div>
              </CardContent>
            </Card>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse">
                <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
                  <tr>
                    <th className="text-left px-3 py-2">Product</th>
                    <th className="text-right px-3 py-2">Eenheid</th>
                    <th className="text-right px-3 py-2">Benodigd</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregated.map((row) => (
                    <tr key={`${row.name}-${row.unit}`} className="border-b hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-800">{row.name}</td>
                      <td className="text-right px-3 py-2 text-slate-700">{row.unit}</td>
                      <td className="text-right px-3 py-2 text-slate-800 font-medium">{row.qtyShown} {row.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Per concept tabs */}
          {activeConceptIds.map((cid, idx) => {
            const concept = concepts.find((c) => c.id === cid)!;
            const inst: Instance = instancesById[cid];
            return (
              <TabsContent key={cid} value={cid}>
                <ConceptEditor
                  concept={concept}
                  instance={inst}
                  onChange={(next) => updateInstance(cid, next)}
                  isAdmin={false}
                  colorIdx={idx}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
