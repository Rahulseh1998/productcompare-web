import type { Metadata } from "next";
import Link from "next/link";
import pako from "pako";

export const metadata: Metadata = {
  title: "Popular Product Comparisons — CompareCart",
  description: "Browse trending Amazon product comparisons. Headphones, laptops, kitchen appliances, and more — compared side-by-side with specs, prices, and AI verdicts.",
};

interface ComparisonProduct {
  asin: string;
  title: string;
  price: string;
  rating: number;
  image: string;
}

interface ComparisonRow {
  label: string;
  values: (string | null)[];
  hasDiff: boolean;
}

interface PopularComparison {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  products: ComparisonProduct[];
  rows: ComparisonRow[];
}

// Curated comparisons with REAL spec data from Amazon pages
const POPULAR_COMPARISONS: PopularComparison[] = [
  {
    slug: "wireless-headphones",
    title: "Best Wireless Headphones 2026",
    subtitle: "Sony WH-1000XM5 vs Bose 700 vs Sennheiser Momentum 4",
    category: "Electronics",
    products: [
      { asin: "B09XS7JWHH", title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: "$248.00", rating: 4.2, image: "https://m.media-amazon.com/images/I/61vJtKbAssL._AC_SX200_.jpg" },
      { asin: "B07Q9MJKBV", title: "Bose Headphones 700 Noise Cancelling Bluetooth", price: "$243.95", rating: 4.5, image: "https://m.media-amazon.com/images/I/51Fea3H8gZL._AC_SX200_.jpg" },
      { asin: "B0BYP6Y34Y", title: "Sennheiser Momentum 4 Wireless Headphones", price: "$279.95", rating: 4.3, image: "https://m.media-amazon.com/images/I/51DJb-gBr+L._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Battery Life", values: ["30 Hours", "20 Hours", "60 Hours"], hasDiff: true },
      { label: "Noise Cancellation", values: ["Active (8 mics)", "11 Levels", "Adaptive ANC"], hasDiff: true },
      { label: "Weight", values: ["8.82 oz", "8.81 oz", "10.05 oz"], hasDiff: true },
      { label: "Bluetooth", values: ["5.2", "5.0", "5.2"], hasDiff: true },
      { label: "Driver Size", values: ["30mm", "40mm", "42mm"], hasDiff: true },
      { label: "Impedance", values: ["48 Ohms", "32 Ohms", "18 Ohms"], hasDiff: true },
      { label: "Charging", values: ["USB-C, 3min=3hrs", "USB-C", "USB-C, 10min=6hrs"], hasDiff: true },
      { label: "Foldable", values: ["Yes", "No", "Yes"], hasDiff: true },
      { label: "Ear Placement", values: ["Over Ear", "Over Ear", "Over Ear"], hasDiff: false },
      { label: "Touch Controls", values: ["Yes", "Yes", "Yes"], hasDiff: false },
      { label: "Voice Assistant", values: ["Alexa, Google", "Alexa, Google", "Alexa, Google"], hasDiff: false },
      { label: "Multipoint", values: ["Yes", "Yes", "Yes"], hasDiff: false },
    ],
  },
  {
    slug: "pressure-cookers",
    title: "Best Multi-Cookers 2026",
    subtitle: "Instant Pot Duo vs Ninja Foodi vs Breville Fast Slow Pro",
    category: "Kitchen",
    products: [
      { asin: "B00FLYWNYQ", title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Qt", price: "$79.95", rating: 4.7, image: "https://m.media-amazon.com/images/I/71V1LrY6jIL._AC_SX200_.jpg" },
      { asin: "B07S85TPLG", title: "Ninja Foodi 9-in-1 Pressure Cooker and Air Fryer", price: "$159.99", rating: 4.6, image: "https://m.media-amazon.com/images/I/81GsJGNwB8L._AC_SX200_.jpg" },
      { asin: "B00OQWNPCO", title: "Breville Fast Slow Pro Multi-Function Cooker", price: "$279.95", rating: 4.3, image: "https://m.media-amazon.com/images/I/71uZ4XZI0bL._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Capacity", values: ["6 Qt", "6.5 Qt", "6 Qt"], hasDiff: true },
      { label: "Wattage", values: ["1000W", "1400W", "1100W"], hasDiff: true },
      { label: "Programs", values: ["7", "9", "11"], hasDiff: true },
      { label: "Air Fry", values: ["No", "Yes", "No"], hasDiff: true },
      { label: "Material", values: ["Stainless Steel", "Stainless Steel", "Brushed Steel"], hasDiff: true },
      { label: "Weight", values: ["11.8 lbs", "14.6 lbs", "15.7 lbs"], hasDiff: true },
      { label: "Display", values: ["LED", "LCD", "LCD with presets"], hasDiff: true },
      { label: "Pressure Levels", values: ["High/Low", "High/Low", "Auto-adjusting"], hasDiff: true },
      { label: "Dishwasher Safe Lid", values: ["Yes", "Yes", "No"], hasDiff: true },
      { label: "Keep Warm", values: ["Yes", "Yes", "Yes"], hasDiff: false },
    ],
  },
  {
    slug: "protein-powder",
    title: "Best Whey Protein Powders 2026",
    subtitle: "Optimum Nutrition vs Dymatize ISO100 vs MyProtein Impact",
    category: "Health",
    products: [
      { asin: "B000QSNYGI", title: "Optimum Nutrition Gold Standard 100% Whey, Double Rich Chocolate", price: "$30.49", rating: 4.6, image: "https://m.media-amazon.com/images/I/71yyCGRv1LL._AC_SX200_.jpg" },
      { asin: "B000GIQT0O", title: "Dymatize ISO100 Hydrolyzed Protein, Gourmet Chocolate", price: "$33.74", rating: 4.6, image: "https://m.media-amazon.com/images/I/616YtEMG97L._AC_SX200_.jpg" },
      { asin: "B07QNH9YR8", title: "Myprotein Impact Whey Protein, Chocolate Smooth", price: "$24.99", rating: 4.4, image: "https://m.media-amazon.com/images/I/71zMIiMRaSL._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Protein per Serving", values: ["24g", "25g", "21g"], hasDiff: true },
      { label: "Calories", values: ["120", "110", "103"], hasDiff: true },
      { label: "Servings", values: ["74", "76", "40"], hasDiff: true },
      { label: "Protein Type", values: ["Whey Blend", "Hydrolyzed Isolate", "Whey Concentrate"], hasDiff: true },
      { label: "Sugar", values: ["1g", "< 1g", "1.5g"], hasDiff: true },
      { label: "BCAAs", values: ["5.5g", "6.8g", "4.5g"], hasDiff: true },
      { label: "Fat", values: ["1.5g", "0.5g", "1.9g"], hasDiff: true },
      { label: "Lactose Free", values: ["No", "Yes", "No"], hasDiff: true },
      { label: "Third Party Tested", values: ["Informed Sport", "Informed Sport", "No"], hasDiff: true },
      { label: "Mixability", values: ["Good", "Excellent", "Good"], hasDiff: true },
    ],
  },
  {
    slug: "office-chairs",
    title: "Best Office Chairs 2026",
    subtitle: "Herman Miller Aeron vs Secretlab Titan vs AmazonBasics Executive",
    category: "Furniture",
    products: [
      { asin: "B01DGN4MHY", title: "Herman Miller Aeron Ergonomic Chair, Size B", price: "$1,395.00", rating: 4.5, image: "https://m.media-amazon.com/images/I/41oHGYNbcuL._AC_SX200_.jpg" },
      { asin: "B0BY2Y4YQK", title: "Secretlab Titan Evo Ergonomic Gaming Chair", price: "$499.00", rating: 4.5, image: "https://m.media-amazon.com/images/I/61rYGJgVH-L._AC_SX200_.jpg" },
      { asin: "B00XBC3BF0", title: "AmazonBasics Executive High Back Office Chair", price: "$154.92", rating: 4.1, image: "https://m.media-amazon.com/images/I/81jMOv-x1zL._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Lumbar Support", values: ["PostureFit SL", "4-way L-ADAPT", "Fixed"], hasDiff: true },
      { label: "Material", values: ["Mesh", "Leatherette/Fabric", "Bonded Leather"], hasDiff: true },
      { label: "Weight Capacity", values: ["350 lbs", "395 lbs", "275 lbs"], hasDiff: true },
      { label: "Armrests", values: ["Adjustable (3-way)", "4D Adjustable", "Fixed"], hasDiff: true },
      { label: "Tilt", values: ["Forward + Recline", "Multi-tilt", "Tilt + Lock"], hasDiff: true },
      { label: "Warranty", values: ["12 years", "5 years", "1 year"], hasDiff: true },
      { label: "Weight", values: ["45 lbs", "73 lbs", "35 lbs"], hasDiff: true },
      { label: "Headrest", values: ["Optional", "Yes (magnetic)", "Yes"], hasDiff: true },
      { label: "Seat Depth Adjust", values: ["Yes", "Yes", "No"], hasDiff: true },
      { label: "Wheels", values: ["Carpet casters", "Multi-surface", "Nylon"], hasDiff: true },
    ],
  },
  {
    slug: "wireless-earbuds",
    title: "Best Wireless Earbuds 2026",
    subtitle: "AirPods Pro 2 vs Galaxy Buds3 Pro vs Sony WF-1000XM5",
    category: "Electronics",
    products: [
      { asin: "B0D1XD1ZV3", title: "Apple AirPods Pro 2nd Gen with USB-C", price: "$189.99", rating: 4.7, image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX200_.jpg" },
      { asin: "B0D64DT6PM", title: "Samsung Galaxy Buds3 Pro Wireless Earbuds", price: "$179.99", rating: 4.2, image: "https://m.media-amazon.com/images/I/51jU1TWKFNL._AC_SX200_.jpg" },
      { asin: "B0C33KGB5K", title: "Sony WF-1000XM5 Noise Canceling Earbuds", price: "$228.00", rating: 4.3, image: "https://m.media-amazon.com/images/I/41sp1TOrGqL._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Battery (buds)", values: ["6 Hours", "7 Hours", "8 Hours"], hasDiff: true },
      { label: "Battery (w/ case)", values: ["30 Hours", "30 Hours", "24 Hours"], hasDiff: true },
      { label: "ANC", values: ["Yes (2x improved)", "Adaptive ANC", "Yes (Integrated V2)"], hasDiff: true },
      { label: "Driver Size", values: ["Custom Apple", "10.5mm Planar", "8.4mm"], hasDiff: true },
      { label: "IP Rating", values: ["IP54", "IP57", "IPX4"], hasDiff: true },
      { label: "Bluetooth", values: ["5.3", "5.4", "5.3"], hasDiff: true },
      { label: "Spatial Audio", values: ["Yes", "360 Audio", "Yes (DSEE)"], hasDiff: true },
      { label: "Codec", values: ["AAC", "SSC, AAC", "LDAC, AAC"], hasDiff: true },
      { label: "Weight (per bud)", values: ["5.3g", "5.4g", "5.9g"], hasDiff: true },
      { label: "Wireless Charging", values: ["Yes (MagSafe)", "Yes (Qi)", "Yes (Qi)"], hasDiff: true },
    ],
  },
  {
    slug: "robot-vacuums",
    title: "Best Robot Vacuums 2026",
    subtitle: "Roomba j9+ vs Roborock S8 MaxV vs Ecovacs X2 Omni",
    category: "Home",
    products: [
      { asin: "B0C415HQPX", title: "iRobot Roomba j9+ Self-Emptying Robot Vacuum", price: "$599.99", rating: 4.2, image: "https://m.media-amazon.com/images/I/61GBwhLfwmL._AC_SX200_.jpg" },
      { asin: "B0CLHB9GJ6", title: "Roborock S8 MaxV Ultra Robot Vacuum and Mop", price: "$1,399.99", rating: 4.4, image: "https://m.media-amazon.com/images/I/61INx49tblL._AC_SX200_.jpg" },
      { asin: "B0CG1GFQV1", title: "ECOVACS DEEBOT X2 OMNI Robot Vacuum and Mop", price: "$999.99", rating: 4.1, image: "https://m.media-amazon.com/images/I/61HEbQqOlEL._AC_SX200_.jpg" },
    ],
    rows: [
      { label: "Suction Power", values: ["4500 Pa", "10000 Pa", "8000 Pa"], hasDiff: true },
      { label: "Mop Function", values: ["No", "Dual Vibra-Rise", "OZMO Turbo 2.0"], hasDiff: true },
      { label: "Self-Empty", values: ["Yes", "Yes", "Yes"], hasDiff: false },
      { label: "Self-Wash Mop", values: ["N/A", "Yes (hot water)", "Yes (hot water)"], hasDiff: true },
      { label: "Navigation", values: ["iAdapt 3.0 + Camera", "LiDAR + 3D ToF", "TrueDetect 3D 3.0"], hasDiff: true },
      { label: "Obstacle Avoidance", values: ["PrecisionVision", "ReactiveAI 2.0", "AIVI 3D 2.0"], hasDiff: true },
      { label: "Battery", values: ["75 min", "180 min", "175 min"], hasDiff: true },
      { label: "Noise Level", values: ["61 dB", "67 dB", "69 dB"], hasDiff: true },
      { label: "App Control", values: ["iRobot Home", "Roborock", "ECOVACS Home"], hasDiff: true },
      { label: "Shape", values: ["Round", "Round", "Square"], hasDiff: true },
    ],
  },
];

function encodeComparisonForUrl(comp: PopularComparison): string {
  const payload = {
    v: 2,
    a: comp.products.map((p) => p.asin),
    lc: "en-US",
    t: comp.products.map((p) => p.title.slice(0, 60)),
    p: comp.products.map((p) => p.price),
    rt: comp.products.map((p) => p.rating),
    im: comp.products.map((p) => p.image),
    r: comp.rows.map((row) => ({
      l: row.label,
      d: row.hasDiff,
      v: row.values,
    })),
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
            Side-by-side comparisons of top-rated Amazon products. Real specs, real prices — powered by CompareCart.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {POPULAR_COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={encodeComparisonForUrl(comp)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-md transition no-underline group"
            >
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                {comp.category}
              </span>
              <h2 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-orange-600 transition">
                {comp.title}
              </h2>
              <p className="text-xs text-gray-500 mb-4">{comp.subtitle}</p>

              {/* Product thumbnails */}
              <div className="flex justify-center gap-3 mb-4">
                {comp.products.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={p.asin}
                    src={p.image}
                    alt={p.title.split(/[,\-–]/)[0]}
                    className="w-14 h-14 object-contain rounded-lg border border-gray-100 p-1"
                  />
                ))}
              </div>

              {/* Quick stats */}
              <div className="flex justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-3">
                <span>{comp.products.length} products</span>
                <span>{comp.rows.filter(r => r.hasDiff).length} differences</span>
                <span>View comparison →</span>
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
