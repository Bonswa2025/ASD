import React, {useState} from 'react';
export function Tabs({defaultValue, children}){
  const [value, setValue] = useState(defaultValue);
  return <div data-tabs data-value={value}>
    {React.Children.map(children, child => React.cloneElement(child, { value, setValue }))}
  </div>;
}
export function TabsList({children, value, setValue, className=''}){
  const items = React.Children.toArray(children);
  return <div className={`flex gap-2 mb-3 ${className}`}>{items}</div>;
}
export function TabsTrigger({children, value: v, setValue, className='', ...rest}){
  const name = rest['data-value'] || rest.value || children;
  return <button className={`px-3 py-1.5 rounded-lg border ${className}`} onClick={()=>setValue?.(name)}>{children}</button>;
}
export function TabsContent({children, value: current, setValue, value}){
  // naive implementation: always render
  return <div>{children}</div>;
}
import React, {createContext, useContext, useState} from 'react';

const TabsCtx = createContext(null);

export function Tabs({defaultValue, value:controlled, onValueChange, children}){
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = (v) => { setInternal(v); onValueChange?.(v); };
  return <TabsCtx.Provider value={{value, setValue}}>{children}</TabsCtx.Provider>;
}

export function TabsList({children, className=''}){ 
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>; 
}

export function TabsTrigger({value, children}){
  const ctx = useContext(TabsCtx);
  const active = ctx?.value === value;
  return (
    <button
      onClick={()=>ctx?.setValue(value)}
      className={`btn ${active? '' : 'outline'}`}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({value, children, className=''}) {
  const ctx = useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}
