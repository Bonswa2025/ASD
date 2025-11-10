// src/context/EmployeesContext.jsx
import React from "react";

export const EmployeesContext = React.createContext({
  employees: [],
  setEmployees: () => {},
  shifts: [],
  setShifts: () => {},
});

export function useEmployees(){
  return React.useContext(EmployeesContext);
}
