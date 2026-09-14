// Local persistence layer for the prototype. Bumped prefix to ensure fresh state.
const PREFIX = 'nextskill_emerald_v1:'

// Purge old cached prototype data if present
if (typeof window !== 'undefined') {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('nextskill:') && !k.startsWith('nextskill_emerald_v1:'))
      .forEach((k) => localStorage.removeItem(k))
  } catch {}
}

export function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage unavailable — fail silently in prototype
  }
}

export function clearAllState(): void {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k))
}
