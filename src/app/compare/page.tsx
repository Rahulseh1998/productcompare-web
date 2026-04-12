import type { Metadata } from "next";
import { decodePayload } from "@/lib/decode-payload";
import { CompareClient } from "./CompareClient";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") urlParams.set(key, value);
  }

  const payload = decodePayload(urlParams);

  if (!payload || !payload.titles?.length) {
    return {
      title: "Product Comparison — CompareCart",
      description: "Compare Amazon products side-by-side with CompareCart.",
    };
  }

  const productNames = payload.titles
    .map((t) => t.split(/[,\-–]/)[0].trim().slice(0, 30))
    .join(" vs ");

  const title = `${productNames} — Product Comparison | CompareCart`;
  const description = `Side-by-side comparison of ${payload.asins.length} products: ${payload.titles.join(", ").slice(0, 150)}. Compare specs, prices, and ratings.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "CompareCart",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function ComparePage() {
  return <CompareClient />;
}
