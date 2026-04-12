import pako from "pako";

export interface CompactRow {
  l: string;
  d: boolean;
  v: (string | null)[];
}

export interface ComparisonPayload {
  v: number;
  asins: string[];
  locale: string;
  titles: string[];
  prices?: (string | null)[];
  ratings?: (number | null)[];
  images?: string[];
  rows?: CompactRow[];
}

/**
 * Decode a comparison payload from URL search params.
 * Supports both compressed (?z=) and legacy (?d=) formats.
 * Safe for server-side use (no window/document).
 */
export function decodePayload(searchParams: URLSearchParams): ComparisonPayload | null {
  // V2: compressed with pako (z param)
  const compressed = searchParams.get("z");
  if (compressed) {
    try {
      const base64 = compressed.replace(/-/g, "+").replace(/_/g, "/");
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const decompressed = pako.inflate(bytes);
      const json = new TextDecoder().decode(decompressed);
      const raw = JSON.parse(json);
      return {
        v: raw.v ?? 2,
        asins: raw.a ?? raw.asins ?? [],
        locale: raw.lc ?? raw.locale ?? "en-US",
        titles: raw.t ?? raw.titles ?? [],
        prices: raw.p ?? raw.prices,
        ratings: raw.rt ?? raw.ratings,
        images: raw.im ?? raw.images,
        rows: raw.r ?? raw.rows,
      };
    } catch {
      return null;
    }
  }

  // V1 fallback: plain base64 (d param)
  const encoded = searchParams.get("d");
  if (encoded) {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return null;
    }
  }

  return null;
}
