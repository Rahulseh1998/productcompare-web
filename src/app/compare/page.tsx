"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import pako from "pako";

interface CompactRow {
  l: string;
  d: boolean;
  v: (string | null)[];
}

// Normalized payload (after parsing either v1 or v2 format)
interface ComparisonPayload {
  v: number;
  asins: string[];
  locale: string;
  titles: string[];
  prices?: (string | null)[];
  ratings?: (number | null)[];
  images?: string[];
  rows?: CompactRow[];
}

function decodePayload(searchParams: URLSearchParams): ComparisonPayload | null {
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
      // Map compact keys to full names
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

function CompareContent() {
  const searchParams = useSearchParams();
  const payload = decodePayload(searchParams);

  if (!payload || !payload.asins?.length) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid comparison link</h1>
        <p className="text-gray-600 mb-8">This link doesn&apos;t contain valid comparison data.</p>
        <a href="/" className="text-orange-500 font-semibold no-underline hover:underline">Go to homepage</a>
      </div>
    );
  }

  const amazonDomain =
    payload.locale === "en-GB" ? "amazon.co.uk" :
    payload.locale === "de-DE" ? "amazon.de" :
    payload.locale === "ja-JP" ? "amazon.co.jp" :
    "amazon.com";

  const affiliateTag = "productcmp-20";
  const hasTable = payload.v >= 2 && payload.rows && payload.rows.length > 0;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Product Comparison</h1>
          <p className="text-sm text-gray-500">
            {payload.asins.length} products compared with CompareCart
          </p>
        </div>

        {/* Floating share sidebar */}
        <FloatingShareSidebar titles={payload.titles} />

        {hasTable ? (
          /* V2: Full comparison table */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
            {/* Scroll hint on mobile */}
            <p className="sm:hidden text-center text-[10px] text-gray-400 py-2 bg-gray-50 border-b border-gray-100">
              ← Swipe to see all products →
            </p>
            <div className="overflow-x-auto">
              <table className="border-collapse" style={{ tableLayout: "fixed", minWidth: `${130 + payload.asins.length * 170}px` }}>
                {/* Product header */}
                <thead>
                  <tr>
                    <th className="bg-gray-50 border-b-2 border-gray-200 border-r border-gray-200 p-3 text-left text-[11px] text-gray-400 uppercase tracking-wider font-medium sticky left-0 z-10 min-w-[130px]">
                      Attribute
                    </th>
                    {payload.asins.map((asin, i) => {
                      const title = payload.titles?.[i] ?? asin;
                      const price = payload.prices?.[i];
                      const rating = payload.ratings?.[i];
                      const image = payload.images?.[i];
                      const amazonUrl = `https://www.${amazonDomain}/dp/${asin}?tag=${affiliateTag}`;

                      return (
                        <th key={asin} className="bg-white border-b-2 border-orange-400 border-r border-gray-200 last:border-r-0 p-3 align-top min-w-[170px]">
                          <div className="flex flex-col items-center gap-2">
                            {image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={image} alt={title} className="w-16 h-16 object-contain rounded" />
                            )}
                            <a
                              href={amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-blue-600 no-underline hover:underline text-center leading-snug line-clamp-2"
                            >
                              {title}
                            </a>
                            {price && (
                              <span className="text-base font-bold text-gray-900">{price}</span>
                            )}
                            <div className="flex items-center gap-2">
                              {rating != null && (
                                <span className="text-[11px] text-amber-500 font-semibold">★ {rating.toFixed(1)}</span>
                              )}
                            </div>
                            <a
                              href={amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center bg-orange-500 text-white py-1.5 rounded-md font-semibold text-[11px] hover:bg-orange-600 transition no-underline mt-1"
                            >
                              View on Amazon
                            </a>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* Attribute rows */}
                <tbody>
                  {payload.rows!.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 ${!row.d ? "opacity-50" : ""}`}
                    >
                      <td className="bg-gray-50 border-r border-gray-200 p-3 text-xs font-medium text-gray-700 sticky left-0 z-10">
                        {row.l}
                      </td>
                      {row.v.map((val, ci) => (
                        <td
                          key={ci}
                          className="border-r border-gray-100 last:border-r-0 p-3 text-xs text-gray-800 text-center"
                        >
                          {val ?? <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* V1 fallback: Product cards */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {payload.asins.map((asin, i) => {
              const title = payload.titles?.[i] ?? `Product ${asin}`;
              const amazonUrl = `https://www.${amazonDomain}/dp/${asin}?tag=${affiliateTag}`;
              const imageUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`;
              return (
                <div key={asin} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt={title} className="w-24 h-24 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <h3 className="text-sm font-semibold text-gray-900 text-center leading-snug line-clamp-3">{title}</h3>
                  <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition no-underline">
                    View on Amazon
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Branded watermark */}
        <p className="text-center text-xs text-gray-400 mb-6">
          Compared with <a href="/" className="text-orange-500 font-semibold no-underline hover:underline">CompareCart</a> — the free Amazon comparison extension
        </p>

        {/* CTA to install extension */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {hasTable ? "Want AI verdicts and price history?" : "Want the full side-by-side comparison?"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Install CompareCart to compare products live on Amazon — with AI-powered verdicts, price tracking, and one-click export.
          </p>
          <a
            href="https://chromewebstore.google.com" /* TODO: Replace with actual CWS listing URL */
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-200 no-underline"
          >
            Add to Chrome — It&apos;s Free
          </a>
        </div>

        {/* Affiliate disclosure */}
        <p className="text-center text-[11px] text-gray-400">
          As an Amazon Associate, we may earn from qualifying purchases made through links on this page. This doesn&apos;t affect the price you pay.
        </p>
      </div>
    </div>
  );
}

function FloatingShareSidebar({ titles }: { titles: string[] }) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const productNames = titles.map((t) => t.split(/[,\-–]/)[0].trim().slice(0, 25)).join(" vs ");
  const shareText = `Check out this product comparison: ${productNames}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!pageUrl) return null;

  const buttons = [
    { href: `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + pageUrl)}`, title: "WhatsApp", color: "#25D366", icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>, icon2: <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/> },
    { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`, title: "X", color: "#000000", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, title: "Facebook", color: "#1877F2", icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
    { href: `mailto:?subject=${encodeURIComponent("Product Comparison — " + productNames)}&body=${encodeURIComponent(shareText + "\n\n" + pageUrl)}`, title: "Email", color: "#6b7280", icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/> },
  ];

  return (
    <>
      {/* Desktop: floating vertical sidebar on left */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-2 shadow-lg">
        <span className="text-[9px] font-semibold text-gray-400 text-center uppercase tracking-wider mb-1">Share</span>
        {buttons.map((btn) => (
          <a
            key={btn.title}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            title={btn.title}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition no-underline hover:scale-110"
            style={{ backgroundColor: `${btn.color}15`, color: btn.color }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{btn.icon}{btn.icon2}</svg>
          </a>
        ))}
        <button
          onClick={copyLink}
          title="Copy link"
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer hover:scale-110 ${copied ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          )}
        </button>
      </div>

      {/* Mobile: compact bar at bottom of header */}
      <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
        <span className="text-xs text-gray-400 mr-1">Share:</span>
        {buttons.map((btn) => (
          <a
            key={btn.title}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            title={btn.title}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition no-underline"
            style={{ backgroundColor: `${btn.color}12`, color: btn.color }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">{btn.icon}{btn.icon2}</svg>
          </a>
        ))}
        <button
          onClick={copyLink}
          title="Copy link"
          className={`px-3 h-8 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${copied ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200"}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading comparison...</div>}>
      <CompareContent />
    </Suspense>
  );
}
