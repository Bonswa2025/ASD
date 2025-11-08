import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Search, LayoutGrid, Truck, Settings, Wrench, ExternalLink, Info, Menu, FileText, Home, Users } from "lucide-react";

/** Hub component (matches canvas version) **/
function useHashRoute(){
  const parse = ()=>{
    const h = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#/, '');
    const [p0, p1, p2] = h.split('/').filter(Boolean);
    if (p0 === 'app' && p1) return { name: 'app', id: p1, sub: p2 || undefined };
    if (p0 === 'docs')   return { name: 'docs' };
    if (p0 === 'settings') return { name: 'settings' };
    return { name: 'home' };
  };
  const [route, setRoute] = useState(parse);
  useEffect(()=>{
    const onHash = ()=> setRoute(parse());
    window.addEventListener('hashchange', onHash);
    return ()=> window.removeEventListener('hashchange', onHash);
  },[]);
  return route;
}

function Topbar(){
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5"/></Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar onNavigate={()=>{}}/>
            </SheetContent>
          </Sheet>
          <LayoutGrid className="h-5 w-5 text-primary"/>
          <span className="font-semibold">Stadslab Suite</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Zoek modules…" className="pl-8 w-64"/>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Snelle acties</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acties</DropdownMenuLabel>
              <DropdownMenuItem onClick={()=>location.hash = '#/app/foodtruck'}>Open Foodtruck Manuals</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>location.hash = '#/app/backoffice'}>Open Backoffice</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={()=>location.hash = '#/docs'}>Bekijk documentatie</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>location.hash = '#/settings'}>Instellingen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function TopStripNav(){
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '#/');
  useEffect(()=>{
    const onHash=()=> setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return ()=> window.removeEventListener('hashchange', onHash);
  },[]);
  const isActive = (h)=> (hash.startsWith(h));
  const Item = ({ icon:Icon, label, href }) => (
    <button onClick={()=>{ location.hash = href; }} className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded ${isActive(href)?'bg-slate-100 text-slate-900':'hover:bg-slate-100'}`}>
      <Icon className="h-4 w-4"/>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
  return (
    <div className="bg-white/70 border-b sticky top-14 z-30">
      <div className="max-w-6xl mx-auto px-2 overflow-x-auto">
        <div className="flex items-center gap-1 py-1">
          <Item icon={Home} label="Dashboard" href="#/" />
          <span className="h-5 w-px bg-slate-200"/>
          <Item icon={Truck} label="Foodtruck" href="#/app/foodtruck" />
          <Item icon={Wrench} label="Backoffice" href="#/app/backoffice" />
          <span className="h-5 w-px bg-slate-200"/>
          <Item icon={Users} label="Rooster" href="#/app/personeel/rooster" />
          <Item icon={Users} label="Medewerkers" href="#/app/personeel/medewerkers" />
          <Item icon={Users} label="Uren" href="#/app/personeel/uren" />
          <span className="h-5 w-px bg-slate-200"/>
          <Item icon={FileText} label="Docs" href="#/docs" />
          <Item icon={Settings} label="Instellingen" href="#/settings" />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }){
  const Item = ({ icon:Icon, label, href }) => (
    <button onClick={()=>{ location.hash = href; onNavigate?.(); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100 text-left">
      <Icon className="h-4 w-4"/>
      <span>{label}</span>
    </button>
  );
  return (
    <div className="h-full w-64 border-r bg-white flex flex-col">
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-primary"/>
        <span className="font-medium">Hoofdmenu</span>
      </div>
      <div className="py-2">
        <Item icon={Home} label="Dashboard" href="#/" />
        <Item icon={Truck} label="Foodtruck Manuals" href="#/app/foodtruck" />
        <Item icon={Wrench} label="Stadslab Backoffice" href="#/app/backoffice" />
        <div className="mt-2">
          <div className="px-4 py-2 text-[11px] uppercase tracking-wide text-slate-500">Personeelsbeheer</div>
          <Item icon={Users} label="Rooster" href="#/app/personeel/rooster" />
          <Item icon={Users} label="Medewerkers" href="#/app/personeel/medewerkers" />
          <Item icon={Users} label="Uren" href="#/app/personeel/uren" />
        </div>
        <Item icon={FileText} label="Documentatie" href="#/docs" />
        <Item icon={Settings} label="Instellingen" href="#/settings" />
      </div>
      <div className="mt-auto p-3 text-[11px] text-slate-500">
        UI v1.0 • Deze hub is stateless; modules bewaren hun eigen data (localStorage/back-end).
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(err){
    return { hasError: true, message: String(err && err.message || err) };
  }
  render(){ return this.state.hasError ? <div className="p-4">Module error: {this.state.message}</div> : this.props.children }
}

function EmbedWrapper({ title, Component, externalHref }){
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); }, []);
  useEffect(()=>{
    if (mounted && !Component) {
      try {
        window.dispatchEvent(new CustomEvent('hub:notify', { detail: { type: 'warning', text: `Module "${title}" niet gekoppeld – terug naar dashboard` } }));
        if (externalHref) window.open(externalHref, '_blank');
      } catch {}
      location.hash = '#/'
    }
  }, [mounted, Component, externalHref, title]);
  if (!mounted || !Component) return null;
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b bg-slate-50 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        {externalHref && (
          <Button size="sm" variant="outline" onClick={()=>window.open(externalHref, '_blank')}>
            Open stand-alone <ExternalLink className="ml-2 h-4 w-4"/>
          </Button>
        )}
      </div>
      <div className="p-2">
        <Suspense fallback={<div className="p-6 text-sm">Laden…</div>}>
          <ErrorBoundary>
            <Component />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}

export default function StadslabSuiteHub({
  foodtruckComponent,
  backofficeComponent,
  staffComponent,
  links = { foodtruck: '', backoffice: '', staff: '' },
}){
  const route = useHashRoute();
  const [, forceTick] = useState(0);
  useEffect(()=>{
    if (typeof window !== 'undefined'){
      window.STADSLAB_APPS = window.STADSLAB_APPS || {};
      window.StadslabHubRegister = function register(map){
        try { Object.assign(window.STADSLAB_APPS, map || {}); } catch {}
        forceTick(x=>x+1);
      };
      const onRegister = ()=> forceTick(x=>x+1);
      window.addEventListener('hub:register', onRegister);
      return ()=> window.removeEventListener('hub:register', onRegister);
    }
  }, []);

  const FoodtruckFromWindow = (typeof window !== 'undefined' && window.STADSLAB_APPS && window.STADSLAB_APPS.Foodtruck) || null;
  const BackofficeFromWindow = (typeof window !== 'undefined' && window.STADSLAB_APPS && window.STADSLAB_APPS.Backoffice) || null;
  const StaffFromWindow = (typeof window !== 'undefined' && window.STADSLAB_APPS && window.STADSLAB_APPS.Personeel) || null;
  const FoodtruckComponent = foodtruckComponent || FoodtruckFromWindow || null;
  const BackofficeComponent = backofficeComponent || BackofficeFromWindow || null;
  const StaffComponent = staffComponent || StaffFromWindow || null;

  const StaffOverview = (p)=> <StaffComponent view="overview" />;
  const StaffRooster = (p)=> <StaffComponent view="rooster" />;
  const StaffMedewerkers = (p)=> <StaffComponent view="medewerkers" />;
  const StaffUren = (p)=> <StaffComponent view="uren" />;

  const HomeCard = ({ icon:Icon, title, desc, href, badge, actionLabel="Open" }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5"/>
            {title}
            {badge && <Badge className="ml-2" variant="secondary">{badge}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{desc}</p>
          <div className="flex items-center gap-2">
            <Button onClick={()=> (location.hash = href)}>{actionLabel}</Button>
            {(href === '#/app/foodtruck' && links.foodtruck) && (
              <Button variant="outline" onClick={()=>window.open(links.foodtruck, '_blank')}>
                Stand-alone <ExternalLink className="ml-2 h-4 w-4"/>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <TopStripNav />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="col-span-12">
          {route.name === 'home' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Welkom 👋</h1>
                <p className="text-sm text-muted-foreground">Kies een module om te starten of gebruik de bovenbalk.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <HomeCard icon={Truck} title="Foodtruck Manuals" desc="Frontoffice handleidingen, checklists, paklijsten en admin-bewerken." href="#/app/foodtruck" badge="Frontoffice + Admin" />
                <HomeCard icon={Wrench} title="Stadslab Backoffice" desc="Concepten activeren, verdelingen, berekeningen en admin CRUD." href="#/app/backoffice" badge="Planning + Inkoop" />
                <HomeCard icon={Users} title="Rooster" desc="Plan diensten en bekijk het rooster." href="#/app/personeel/rooster" badge="Personeel" />
                <HomeCard icon={Users} title="Medewerkers" desc="Beheer medewerkers en rollen." href="#/app/personeel/medewerkers" badge="Personeel" />
                <HomeCard icon={Users} title="Uren" desc="Registreer en controleer uren." href="#/app/personeel/uren" badge="Personeel" />
              </div>
            </div>
          )}

          {route.name === 'app' && route.id === 'foodtruck' && (
            <EmbedWrapper title="Foodtruck Manuals" Component={FoodtruckComponent} externalHref={links.foodtruck} />
          )}
          {route.name === 'app' && route.id === 'backoffice' && (
            <EmbedWrapper title="Stadslab Backoffice" Component={BackofficeComponent} externalHref={links.backoffice} />
          )}
          {route.name === 'app' && route.id === 'personeel' && (
            <EmbedWrapper title={`Personeelsbeheer${route.sub?` – ${route.sub}`:''}`} Component={route.sub==='rooster' ? StaffRooster : route.sub==='medewerkers' ? StaffMedewerkers : route.sub==='uren' ? StaffUren : StaffOverview} externalHref={links.staff} />
          )}
        </div>
      </div>
    </div>
  );
}
