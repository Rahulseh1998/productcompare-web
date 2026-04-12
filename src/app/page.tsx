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
            The free Chrome extension that compares Amazon products side-by-side — specs, prices, and AI-powered verdicts. No more 10 open tabs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {/* TODO: Replace with actual CWS listing URL */}
            <a
              href="https://chromewebstore.google.com" /* TODO: Replace with actual CWS listing URL */
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-orange-600 transition shadow-lg shadow-orange-200 no-underline"
            >
              Add to Chrome — It&apos;s Free
            </a>
            <a
              href="/comparisons"
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-300 transition no-underline"
            >
              See it in Action
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Works on all Amazon stores (US, UK, DE, JP, CA, FR) &middot; No account required &middot; AI features included free
          </p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-4xl px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">⚡</span>
            Zero setup — works instantly
          </span>
          <span className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">🔒</span>
            All data stays in your browser
          </span>
          <span className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">🤖</span>
            AI verdict — no API key needed
          </span>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
            Three steps. No sign-up. No API keys. Just install and compare.
          </p>
          <div className="grid sm:grid-cols-3 gap-10">
            <Step number="1" title="Browse & Add" description="Visit any Amazon product page. A floating button appears — click it to add the product to your compare list." />
            <Step number="2" title="Compare Side-by-Side" description="Open the comparison panel. Every spec lined up in a table — differences highlighted in green and red so you see what matters." />
            <Step number="3" title="Get the AI Verdict" description="One click generates an AI-powered verdict: best value, best specs, top rated — with a plain-English summary of why." />
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
            <Feature
              title="Smart Spec Extraction"
              description="Automatically pulls 30-50 attributes from any Amazon product — dimensions, weight, battery, material, compatibility. No manual data entry."
              badge="free"
            />
            <Feature
              title="Diff Highlighting"
              description="Differences jump out in green and red. Identical values are dimmed. You instantly see what's different between products."
              badge="free"
            />
            <Feature
              title="AI-Powered Verdict"
              description="Claude AI compares your products and picks the best value, best specs, and top rated — with a 2-sentence summary you'd actually trust."
              badge="free"
              note="3 verdicts/day free, unlimited with Pro"
            />
            <Feature
              title="Share & Export"
              description="Share a comparison link on WhatsApp, X, or email. Export as CSV for spreadsheets or a branded PNG image."
              badge="free"
            />
            <Feature
              title="Price Drop Alerts"
              description="Set alerts on compared products. Get a Chrome notification when the price drops — so you never miss a deal."
              badge="pro"
              note="Coming soon"
            />
            <Feature
              title="Compare 5 Products"
              description="Free users compare up to 3 products. Pro unlocks 5-product comparisons for those serious about finding the best option."
              badge="pro"
            />
          </div>
        </div>
      </section>

      {/* Popular comparisons teaser */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            See real comparisons
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Browse popular product comparisons made with CompareCart — headphones, kitchen appliances, office gear, and more.
          </p>
          <a href="/comparisons" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-800 transition no-underline">
            Browse Comparisons
          </a>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free is powerful. Pro is smarter.
          </h2>
          <p className="text-gray-600 mb-10">
            The free tier extracts specs, compares products, and generates AI verdicts. Upgrade for price alerts, image export, and 5-product comparisons.
          </p>
          <a href="/pro" className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-purple-700 transition no-underline">
            See Pricing
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-orange-500">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to stop tab-hopping?</h2>
          <p className="text-orange-100 mb-6 text-sm">Install in 10 seconds. No sign-up. No credit card.</p>
          {/* TODO: Replace with actual CWS listing URL */}
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

function Feature({ title, description, badge, note }: { title: string; description: string; badge: "free" | "pro"; note?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badge === "pro" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      {note && <p className="text-[11px] text-gray-400 mt-2">{note}</p>}
    </div>
  );
}
