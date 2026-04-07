import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductCompare Pro — AI Verdicts, Price History & More",
  description: "Upgrade to Pro for AI-powered verdicts, price history charts, image export, and 5-product comparisons.",
};

export default function ProPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Compare smarter with <span className="text-purple-600">Pro</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Everything in Free, plus AI verdicts, price history, image export, and room for 5 products.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Free</h3>
            <p className="text-3xl font-extrabold text-gray-900 mb-1">$0</p>
            <p className="text-sm text-gray-500 mb-6">Forever</p>
            <ul className="space-y-3 text-sm text-gray-700 mb-8">
              <Li included>Compare up to 3 products</Li>
              <Li included>Attribute extraction (instant)</Li>
              <Li included>Side-by-side table with diff</Li>
              <Li included>CSV export</Li>
              <Li included>Share comparison link</Li>
              <Li>AI Verdict</Li>
              <Li>Price history chart</Li>
              <Li>Image export</Li>
            </ul>
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition no-underline"
            >
              Install Free
            </a>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border-2 border-purple-500 p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Pro</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-3xl font-extrabold text-gray-900">$2.99</p>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              or $19.99/year <span className="text-green-600 font-semibold">(save 44%)</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-8">
              <Li included>Compare up to 5 products</Li>
              <Li included>Attribute extraction (instant)</Li>
              <Li included>Side-by-side table with diff</Li>
              <Li included>CSV export</Li>
              <Li included>Share comparison link</Li>
              <Li included>AI Verdict (Claude-powered)</Li>
              <Li included>Price history chart (90 days)</Li>
              <Li included>Image export with branding</Li>
            </ul>
            {/* TODO: Replace with real Stripe payment link */}
            <a
              href="https://buy.stripe.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-700 transition shadow-lg shadow-purple-200 no-underline"
            >
              Get Pro — $2.99/mo
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <Faq
              q="How do I activate Pro?"
              a="After purchase, you'll receive a license key. Open the extension popup, go to Settings, enter your email and key, and click Activate."
            />
            <Faq
              q="Can I cancel anytime?"
              a="Yes. Monthly subscribers can cancel at any time — your Pro access stays active until the end of the billing period."
            />
            <Faq
              q="Is my API key required for Pro?"
              a="No. Pro includes AI Verdict and Price History without you needing to set up any API keys. The free tier's basic extraction also works without any keys."
            />
            <Faq
              q="Does the extension collect my data?"
              a="No. All product data stays in your browser. The only external calls are to the AI service (for verdicts) and price data — no browsing history, no PII, no tracking."
            />
            <Faq
              q="What if Amazon changes their website?"
              a="Our extraction engine is built to handle DOM changes gracefully. We monitor for issues weekly and push fixes that apply instantly — no extension update needed."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Li({ children, included }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <span className={`mt-0.5 ${included ? "text-green-500" : "text-gray-300"}`}>
        {included ? "✓" : "—"}
      </span>
      <span className={included ? "" : "text-gray-400"}>{children}</span>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-gray-100 pb-5">
      <h3 className="font-semibold text-gray-900 mb-1">{q}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
    </div>
  );
}
