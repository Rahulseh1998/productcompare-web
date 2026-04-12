/**
 * Simple in-memory rate limiter by IP.
 * Resets daily. Good enough for V1 — upgrade to Vercel KV for production scale.
 */

const FREE_LIMITS = {
  verdict: 3,
  extract: 5,
};

const PRO_LIMITS = {
  verdict: 100,
  extract: 200,
};

// In-memory store: IP → { date, verdictCount, extractCount }
const store = new Map<string, { date: string; verdict: number; extract: number }>();

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function getEntry(ip: string) {
  const d = today();
  let entry = store.get(ip);
  if (!entry || entry.date !== d) {
    entry = { date: d, verdict: 0, extract: 0 };
    store.set(ip, entry);
  }
  // Cleanup old entries (prevent memory leak)
  if (store.size > 10000) {
    for (const [key, val] of store) {
      if (val.date !== d) store.delete(key);
    }
  }
  return entry;
}

export function checkRateLimit(
  ip: string,
  type: "verdict" | "extract",
  isPro: boolean
): { allowed: boolean; remaining: number; limit: number } {
  const entry = getEntry(ip);
  const limits = isPro ? PRO_LIMITS : FREE_LIMITS;
  const count = entry[type];
  const limit = limits[type];

  if (count >= limit) {
    return { allowed: false, remaining: 0, limit };
  }

  return { allowed: true, remaining: limit - count - 1, limit };
}

export function incrementCount(ip: string, type: "verdict" | "extract"): void {
  const entry = getEntry(ip);
  entry[type]++;
}
