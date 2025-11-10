// src/components/EmployeeCard.jsx
import React from "react";

function Chip({children}) {
  return (
    <span className="px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-700 border border-gray-200">
      {children}
    </span>
  );
}

export default function EmployeeCard({
  employee,
  shifts = [],
  onEdit,
  onDelete,
  footer,        // optioneel: eigen inhoud onderin de kaart (bv. knoppen)
}) {
  return (
    <section className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{employee.name}</div>
          <div className="text-xs text-gray-500">{employee.role || "—"}</div>
          <div className="text-xs text-gray-500">{shifts.length} dienst(en)</div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button onClick={onEdit} className="px-2 py-1 rounded-lg border bg-white hover:bg-gray-50">
              Bewerken
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="px-2 py-1 rounded-lg border bg-white hover:bg-gray-50">
              Verwijderen
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto">
        {shifts.length === 0 ? (
          <div className="text-sm text-gray-500">Geen diensten</div>
        ) : (
          shifts.map((s) => (
            <div key={`${employee.id}_${s.id}`} className="rounded-xl border p-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.date} • {s.start}–{s.end}</div>
                <Chip>{s.team || s.roleId || "dienst"}</Chip>
              </div>
            </div>
          ))
        )}
      </div>

      {footer}
    </section>
  );
}
