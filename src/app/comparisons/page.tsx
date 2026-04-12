import type { Metadata } from "next";
import Link from "next/link";
import pako from "pako";

export const metadata: Metadata = {
  title: "Popular Product Comparisons — CompareCart",
  description: "Browse trending Amazon product comparisons. Headphones, laptops, kitchen appliances, and more — compared side-by-side with specs, prices, and AI verdicts.",
};

// Pre-built comparison data for SEO. These are real popular comparisons
// that drive organic search traffic for "X vs Y" queries.
const POPULAR_COMPARISONS = [
  {
    slug: "headphones",
    title: "Best Wireless Headphones 2026",
    subtitle: "Sony WH-1000XM5 vs Bose 700 vs Apple AirPods Max",
    category: "Electronics",
    products: [
      { asin: "B09XS7JWHH", title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: "$248.00" },
      { asin: "B07Q9MJKBV", title: "Bose Headphones 700, Noise Cancelling Bluetooth", price: "$243.95" },
      { asin: "B0DKJLK1L2", title: "Apple AirPods Max with USB-C", price: "$449.00" },
    ],
  },
  {
    slug: "robot-vacuums",
    title: "Best Robot Vacuums 2026",
    subtitle: "iRobot Roomba j7+ vs Roborock S8 Pro Ultra vs Ecovacs Deebot X2",
    category: "Home",
    products: [
      { asin: "B094NYHTMF", title: "iRobot Roomba j7+ Self-Emptying Robot Vacuum", price: "$399.99" },
      { asin: "B0C7VLM1K5", title: "Roborock S8 Pro Ultra Robot Vacuum and Mop", price: "$1,099.99" },
      { asin: "B0CG1GFQV1", title: "ECOVACS DEEBOT X2 OMNI Robot Vacuum and Mop", price: "$999.99" },
    ],
  },
  {
    slug: "protein-powder",
    title: "Best Protein Powders 2026",
    subtitle: "Optimum Nutrition vs Dymatize vs MyProtein",
    category: "Health",
    products: [
      { asin: "B000QSNYGI", title: "Optimum Nutrition Gold Standard 100% Whey", price: "$30.49" },
      { asin: "B000GIQT0O", title: "Dymatize ISO100 Hydrolyzed Protein Powder", price: "$33.74" },
      { asin: "B07QNH9YR8", title: "Myprotein Impact Whey Protein Powder", price: "$24.99" },
    ],
  },
  {
    slug: "office-chairs",
    title: "Best Office Chairs Under $500",
    subtitle: "Herman Miller vs Secretlab vs AmazonBasics",
    category: "Furniture",
    products: [
      { asin: "B01DGN4MHY", title: "Herman Miller Aeron Ergonomic Chair", price: "$1,395.00" },
      { asin: "B0BY2Y4YQK", title: "Secretlab Titan Evo 2022 Gaming Chair", price: "$499.00" },
      { asin: "B00XBC3BF0", title: "AmazonBasics Executive High Back Office Chair", price: "$154.92" },
    ],
  },
  {
    slug: "instant-pots",
    title: "Best Multi-Cookers 2026",
    subtitle: "Instant Pot Duo vs Ninja Foodi vs Breville Fast Slow Pro",
    category: "Kitchen",
    products: [
      { asin: "B00FLYWNYQ", title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker", price: "$79.95" },
      { asin: "B07S85TPLG", title: "Ninja Foodi 9-in-1 Pressure Cooker and Air Fryer", price: "$159.99" },
      { asin: "B00OQWNPCO", title: "Breville Fast Slow Pro Multi-Function Cooker", price: "$279.95" },
    ],
  },
  {
    slug: "wireless-earbuds",
    title: "Best Wireless Earbuds 2026",
    subtitle: "AirPods Pro vs Samsung Galaxy Buds vs Sony WF-1000XM5",
    category: "Electronics",
    products: [
      { asin: "B0D1XD1ZV3", title: "Apple AirPods Pro 2nd Generation with USB-C", price: "$189.99" },
      { asin: "B0C33XXQGZ", title: "Samsung Galaxy Buds2 Pro Wireless Earbuds", price: "$159.99" },
      { asin: "B0C33KGB5K", title: "Sony WF-1000XM5 Noise Canceling Earbuds", price: "$228.00" },
    ],
  },
];

function encodeComparisonForUrl(products: { asin: string; title: string; price: string }[]): string {
  const payload = {
    v: 2,
    a: products.map((p) => p.asin),
    lc: "en-US",
    t: products.map((p) => p.title.slice(0, 60)),
    p: products.map((p) => p.price),
    rt: products.map(() => null),
    im: products.map(() => ""),
    r: [],
  };
  const json = JSON.stringify(payload);
  const compressed = pako.deflate(new TextEncoder().encode(json));
  const base64 = btoa(String.fromCharCode(...compressed))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `/compare?z=${base64}`;
}

export default function ComparisonsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Popular Product Comparisons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Side-by-side comparisons of top-rated Amazon products. Powered by CompareCart.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {POPULAR_COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={encodeComparisonForUrl(comp.products)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-md transition no-underline group"
            >
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                {comp.category}
              </span>
              <h2 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-orange-600 transition">
                {comp.title}
              </h2>
              <p className="text-xs text-gray-500 mb-4">{comp.subtitle}</p>
              <div className="flex flex-wrap gap-1">
                {comp.products.map((p) => (
                  <span
                    key={p.asin}
                    className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                  >
                    {p.title.split(/[,\-–]/)[0].trim().slice(0, 20)}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Want to compare your own products?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Install CompareCart and compare any Amazon products side-by-side — with AI-powered verdicts and one-click sharing.
          </p>
          {/* TODO: Replace with actual CWS listing URL */}
          <a
            href="https://chromewebstore.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-200 no-underline"
          >
            Add to Chrome — It&apos;s Free
          </a>
        </div>
      </div>
    </div>
  );
}
