// rooster_module.js
import React, { useMemo } from "react";
import { useEmployees } from "./context/EmployeesContext";
import EmployeeCard from "./components/EmployeeCard";

function byDate(a, b) {
  const d = (a.date || "").localeCompare(b.date || "");
  return d !== 0 ? d : (a.start || "").localeCompare(b.start || "");
}

export default function RoosterModule({ onEditEmployee, onDeleteEmployee }) {
  const { employees, shifts } = useEmployees();

  // Koppel shifts per medewerker
  const shiftsByEmployee = useMemo(() => {
    const map = new Map(employees.map(e => [e.id, []]));
    (shifts || []).forEach(s => {
      if (!map.has(s.employeeId)) map.set(s.employeeId, []);
      map.get(s.employeeId).push(s);
    });
    for (const list of map.values()) list.sort(byDate);
    return map;
  }, [employees, shifts]);

  if (!employees?.length) {
    return <div className="text-sm text-gray-600">Nog geen medewerkers toegevoegd.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map(emp => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          shifts={shiftsByEmployee.get(emp.id) || []}
          onEdit={onEditEmployee ? () => onEditEmployee(emp) : undefined}
          onDelete={onDeleteEmployee ? () => onDeleteEmployee(emp.id) : undefined}
        />
      ))}
    </div>
  );
}
