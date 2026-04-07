import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CompareCart for Amazon",
  description: "How CompareCart handles your data. Short answer: everything stays in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6 prose prose-gray prose-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 7, 2026</p>

        <p>
          CompareCart for Amazon (&quot;CompareCart&quot;, &quot;we&quot;, &quot;our&quot;) is a Chrome browser extension
          that helps users compare Amazon products side-by-side. We are committed to protecting your privacy.
          This policy explains what data we access, how we use it, and what we don&apos;t do.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">What data does the extension access?</h2>

        <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2">Amazon product page data</h3>
        <p>
          When you visit an Amazon product page, the extension reads publicly visible product information
          from the page: product title, price, rating, review count, brand, images, and technical specifications.
          This data is used solely to build your comparison table.
        </p>

        <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2">Data you provide</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Anthropic API key</strong> (optional) — If you choose to enable AI-powered features, you enter your own API key. It is stored locally in your browser and used only to call the Anthropic API directly from your device.</li>
          <li><strong>License key and email</strong> (Pro users) — Used to validate your Pro subscription. Stored locally in your browser.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Where is data stored?</h2>
        <p>
          All data is stored locally on your device using Chrome&apos;s built-in storage APIs
          (<code>chrome.storage.local</code>). We do not operate servers that store your data.
          Your comparison lists, settings, API keys, and license information never leave your browser
          except as described below.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">What network requests does the extension make?</h2>
        <p>The extension makes the following external requests, and only when you explicitly trigger them:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Anthropic API</strong> (<code>api.anthropic.com</code>) — When you add a product and have an API key configured,
            the extension sends product specification text (not personal information) to extract structured attributes.
            When you click &quot;Generate Verdict&quot;, it sends product titles, prices, and ratings to generate a comparison summary.
          </li>
        </ul>
        <p>No other external requests are made. The extension does not contact any analytics services, tracking pixels, or third-party servers.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">What we do NOT collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Browsing history</li>
          <li>Personal information (name, address, payment details)</li>
          <li>Amazon account credentials</li>
          <li>Purchase history</li>
          <li>Analytics or usage telemetry</li>
          <li>Cookies or tracking identifiers</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Shared comparison links</h2>
        <p>
          When you use the &quot;Share&quot; feature, the extension encodes your comparison data (product titles, prices,
          ratings, and attribute values) into the URL itself. This data is not stored on our servers — it exists
          only in the URL. Anyone with the link can see the comparison. Do not share links if the comparison
          contains information you consider private.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Companion website</h2>
        <p>
          The CompareCart website (<code>comparecart.app</code>) is a static site that renders shared comparison
          links and provides extension download links. It does not use cookies, tracking scripts, or analytics
          in its current version. Links to Amazon products on the comparison page may contain an affiliate tag.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Third-party services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Anthropic</strong> — AI model provider. Subject to <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500">Anthropic&apos;s Privacy Policy</a>.</li>
          <li><strong>Amazon</strong> — Product data is read from publicly accessible Amazon product pages. Affiliate links on the companion website are subject to the <a href="https://affiliate-program.amazon.com/help/operating/agreement" target="_blank" rel="noopener noreferrer" className="text-orange-500">Amazon Associates Program Agreement</a>.</li>
          <li><strong>Stripe</strong> — Payment processing for Pro subscriptions. Subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500">Stripe&apos;s Privacy Policy</a>.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Children&apos;s privacy</h2>
        <p>
          CompareCart is not directed at children under 13. We do not knowingly collect
          information from children.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with an
          updated revision date. Continued use of the extension after changes constitutes acceptance
          of the revised policy.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us at{" "}
          <a href="mailto:privacy@comparecart.app" className="text-orange-500">privacy@comparecart.app</a>.
        </p>
      </div>
    </div>
  );
}
