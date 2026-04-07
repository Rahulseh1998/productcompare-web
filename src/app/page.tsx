export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Stop switching tabs.<br />
            <span className="text-orange-500">Compare in one click.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The free Chrome extension that lets you compare Amazon products side-by-side — with AI-powered insights, price history, and smart verdicts. No more 10 open tabs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-orange-600 transition shadow-lg shadow-orange-200 no-underline"
            >
              Add to Chrome — It&apos;s Free
            </a>
            <a
              href="#features"
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-300 transition no-underline"
            >
              See Features
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Works on all Amazon stores (US, UK, DE, JP, CA, FR) &middot; No account required
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            <Step number="1" title="Browse & Add" description="Visit any Amazon product page. Click the floating compare button to add it to your list." />
            <Step number="2" title="Compare Side-by-Side" description="Open the comparison panel. See every attribute lined up — differences highlighted in green and red." />
            <Step number="3" title="Get the Verdict" description="AI analyzes specs, prices, and ratings to tell you which product wins — and why." />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Everything you need to decide
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <Feature title="Smart Attribute Extraction" description="Automatically extracts specs from Amazon product pages — no manual data entry. Works across all categories." badge="free" />
            <Feature title="Side-by-Side Comparison" description="Clean table with differences highlighted. Identical values dimmed so you see what matters." badge="free" />
            <Feature title="AI-Powered Verdict" description="Claude AI analyzes your products and picks the best value, best specs, and top-rated option." badge="pro" />
            <Feature title="Price History Chart" description="See 90 days of price trends for every product. Know if you're getting a deal or should wait." badge="pro" />
            <Feature title="Export & Share" description="Share a comparison link with anyone. Export as CSV or a branded PNG image." badge="free" />
            <Feature title="Cross-Category Detection" description="Accidentally comparing a laptop and a teapot? We'll warn you — but won't stop you." badge="free" />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free is powerful. Pro is smarter.
          </h2>
          <p className="text-gray-600 mb-10">
            Compare up to 3 products for free. Upgrade to Pro for AI verdicts, price history, image export, and 5-product comparisons.
          </p>
          <a href="/pro" className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-purple-700 transition no-underline">
            See Pricing
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-orange-500">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to stop tab-hopping?</h2>
          <a
            href="https://chromewebstore.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-bold text-base hover:bg-orange-50 transition shadow-lg no-underline"
          >
            Add to Chrome — It&apos;s Free
          </a>
        </div>
      </section>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function Feature({ title, description, badge }: { title: string; description: string; badge: "free" | "pro" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badge === "pro" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
