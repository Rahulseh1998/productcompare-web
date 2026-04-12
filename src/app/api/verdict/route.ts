import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/claude-proxy";
import { checkRateLimit, incrementCount } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const licenseKey = request.headers.get("x-license-key");
  const isPro = !!licenseKey && licenseKey.startsWith("PRO-");

  // Rate limit check
  const { allowed, remaining, limit } = checkRateLimit(ip, "verdict", isPro);
  if (!allowed) {
    return NextResponse.json(
      { error: `Daily limit reached (${limit}/day). Upgrade to Pro for unlimited AI verdicts.` },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Limit": String(limit) },
      }
    );
  }

  try {
    const body = await request.json();
    const { products } = body;

    if (!products || !Array.isArray(products) || products.length < 2) {
      return NextResponse.json({ error: "Need at least 2 products" }, { status: 400 });
    }

    const productLines = products
      .map(
        (p: { asin: string; title: string; priceFormatted: string; rating?: number; reviewCount?: number; brand?: string; attributes?: { label: string; value: string; unit?: string }[] }) => {
          const topAttrs = (p.attributes || [])
            .slice(0, 5)
            .map((a) => `${a.label}: ${a.value}${a.unit ? " " + a.unit : ""}`)
            .join(", ");
          return `ASIN: ${p.asin}\nTitle: ${p.title}\nPrice: ${p.priceFormatted}\nRating: ${p.rating ?? "N/A"}/5 (${p.reviewCount ?? "N/A"} reviews)\nBrand: ${p.brand ?? "N/A"}\nKey specs: ${topAttrs || "N/A"}`;
        }
      )
      .join("\n\n");

    const prompt = `You are a helpful shopping assistant. Compare these Amazon products and give a concise, honest verdict.

${productLines}

Respond ONLY with this exact JSON (no markdown, no explanation):
{"bestValue":"<ASIN of best value for money>","bestSpecs":"<ASIN with best technical specifications>","bestRated":"<ASIN with highest customer satisfaction>","summary":"<2-3 sentences a real shopper would find useful. Be specific, mention actual product names and key differentiators.>"}`;

    const result = await callClaude({
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const verdict = JSON.parse(jsonMatch[0]);
    incrementCount(ip, "verdict");

    return NextResponse.json(
      {
        verdict: {
          bestValue: verdict.bestValue ?? products[0].asin,
          bestSpecs: verdict.bestSpecs ?? products[0].asin,
          bestRated: verdict.bestRated ?? products[0].asin,
          summary: verdict.summary ?? "",
          generatedAt: Date.now(),
        },
        remaining,
      },
      { headers: { "X-RateLimit-Remaining": String(remaining), "X-RateLimit-Limit": String(limit) } }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
