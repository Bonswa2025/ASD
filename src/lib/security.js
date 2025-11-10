// src/lib/security.js
export function isValidPin(pin) {
  return typeof pin === "string" && /^\d{5}$/.test(pin);
}

export async function hashPin(pin) {
  // pin is string met 5 cijfers
  const enc = new TextEncoder().encode(pin);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  // hex string
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}
