// src/lib/storage.js
const KEY = "asd_medewerkers_v1";

export function loadEmployees() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEmployees(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
