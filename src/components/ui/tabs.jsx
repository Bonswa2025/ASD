import React, { createContext, useContext, useState } from 'react';

const TabsCtx = createContext(null);

/**
 * Tabs (lichte stub)
 * - Controlled: <Tabs value="setup" onValueChange={...}>
 * - Uncontrolled: <Tabs defaultValue="setup">
 */
export function Tabs({ defaultValue, value: controlled, onValueChange, children }) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = (v) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return <TabsCtx.Provider value={{ value, setValue }}>{children}</TabsCtx.Provider>;
}

export function TabsList({ children, className = '' }) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = '' }) {
  const ctx = useContext(TabsCtx);
  const active = ctx?.value === value;
  // gebruikt onze .btn/.outline styles uit styles.css
  return (
    <button
      type="button"
      onClick={() => ctx?.setValue(value)}
      className={`btn ${active ? '' : 'outline'} ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }) {
  const ctx = useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}
