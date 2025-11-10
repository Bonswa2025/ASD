// src/components/ui/select.jsx
import React, { createContext, useContext } from 'react';

const Ctx = createContext(null);

/**
 * Lichte Select-stub:
 * <Select value={...} onValueChange={...}>
 *   <SelectTrigger><SelectValue /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">A</SelectItem>
 *   </SelectContent>
 * </Select>
 */
export function Select({ value, onValueChange, children }) {
  return <Ctx.Provider value={{ value, onValueChange }}>{children}</Ctx.Provider>;
}

export function SelectTrigger({ children, className = '', ...rest }) {
  return (
    <div className={`input ${className}`} style={{ cursor: 'pointer' }} {...rest}>
      {children}
    </div>
  );
}

export function SelectValue() {
  return null; // presentational in deze stub
}

export function SelectContent({ children }) {
  return (
    <div
      style={{
        marginTop: 6,
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#0b1220',
      }}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children, onClick }) {
  const ctx = useContext(Ctx);
  const active = ctx?.value === value;
  return (
    <div
      onClick={() => {
        ctx?.onValueChange?.(value);
        onClick?.(value);
      }}
      style={{
        padding: '8px 12px',
        borderBottom: '1px solid var(--border)',
        background: active ? 'rgba(110,231,183,.12)' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
}
