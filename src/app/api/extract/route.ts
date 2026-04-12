import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/claude-proxy";
import { checkRateLimit, incrementCount } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const licenseKey = request.headers.get("x-license-key");
  const isPro = !!licenseKey && licenseKey.startsWith("PRO-");

  const { allowed, remaining, limit } = checkRateLimit(ip, "extract", isPro);
  if (!allowed) {
    return NextResponse.json(
      { error: `Daily limit reached (${limit}/day). Upgrade to Pro for unlimited AI extraction.` },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Limit": String(limit) },
      }
    );
  }

  try {
    const body = await request.json();
    const { pageText } = body;

    if (!pageText || typeof pageText !== "string" || pageText.length < 50) {
      return NextResponse.json({ error: "pageText required (min 50 chars)" }, { status: 400 });
    }

    const prompt = `You are a product data extractor for Amazon. Extract meaningful product attributes from the page text below.

Rules:
- Include factual specs only (dimensions, weight, material, compatibility, battery, resolution, etc.)
- Skip pure marketing phrases ("premium quality", "best in class", "revolutionary")
- Normalize units: "250 grams" → value: "250", unit: "g"
- Use readable labels: "Battery Life", "Screen Size", "Weight", etc.
- Use snake_case for keys: "battery_life", "screen_size", "weight"
- Max 20 most important attributes
- If a value has no unit, omit the unit field

Respond ONLY with a valid JSON array. No explanation, no markdown. Example:
[{"key":"battery_life","label":"Battery Life","value":"30","unit":"hours","rawValue":"Up to 30 hours"}]

Page text:
${pageText.slice(0, 4000)}`;

    const result = await callClaude({
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ attributes: [] });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const attributes = parsed.map((attr: Record<string, unknown>) => ({
      key: String(attr.key ?? ""),
      label: String(attr.label ?? ""),
      value: attr.value ?? null,
      rawValue: String(attr.rawValue ?? attr.value ?? ""),
      unit: attr.unit ? String(attr.unit) : undefined,
    }));

    incrementCount(ip, "extract");

    return NextResponse.json(
      { attributes, remaining },
      { headers: { "X-RateLimit-Remaining": String(remaining), "X-RateLimit-Limit": String(limit) } }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
