// src/components/ui/dialog.jsx
import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div
      onClick={() => onOpenChange?.(false)}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
      }}
    >
      <div className="card" style={{ minWidth: 360 }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className = '' }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

export function DialogHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }) {
  return <div className={`font-semibold ${className}`}>{children}</div>;
}

export function DialogFooter({ children, className = '' }) {
  return (
    <div className={`card-content ${className}`} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      {children}
    </div>
  );
}
