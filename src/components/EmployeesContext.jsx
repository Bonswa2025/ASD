import React, { createContext, useContext, useState } from 'react';

const EmployeesContext = createContext(null);
export const useEmployees = () => useContext(EmployeesContext);

export function EmployeesProvider({children}){
  const [employees, setEmployees] = useState([
    { id: 'e1', name: 'Alex', role: 'Barista', phone: '0612345678', active: true },
    { id: 'e2', name: 'Bo', role: 'Chef', phone: '0687654321', active: true },
    { id: 'e3', name: 'Chris', role: 'Runner', phone: '0600000000', active: false },
  ]);

  function addEmployee(emp){
    const id = 'e' + (employees.length+1);
    setEmployees(prev => [...prev, { id, active: true, ...emp }]);
  }
  function toggleActive(id){
    setEmployees(prev => prev.map(e => e.id===id? {...e, active: !e.active} : e));
  }
  function removeEmployee(id){
    setEmployees(prev => prev.filter(e => e.id!==id));
  }

  return <EmployeesContext.Provider value={{ employees, addEmployee, toggleActive, removeEmployee }}>
    {children}
  </EmployeesContext.Provider>;
}