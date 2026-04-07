import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CompareCart for Amazon",
  description: "Terms governing your use of the CompareCart browser extension and website.",
};

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6 prose prose-gray prose-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 7, 2026</p>

        <p>
          These terms govern your use of the CompareCart for Amazon browser extension (&quot;Extension&quot;)
          and the CompareCart website at <code>comparecart.app</code> (&quot;Website&quot;), collectively
          referred to as the &quot;Service&quot;. By using the Service, you agree to these terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Description of Service</h2>
        <p>
          CompareCart is a browser extension that helps users compare Amazon product listings
          side-by-side. It extracts publicly available product information from Amazon product pages
          and presents it in a comparison format. The Website hosts shared comparisons and provides
          information about the Extension.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Free and Pro tiers</h2>
        <p>
          The Extension offers a free tier with core comparison features and a paid Pro tier with
          additional features including AI-powered verdicts, price history charts, and image export.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Free tier:</strong> Compare up to 3 products, CSV export, share links.</li>
          <li><strong>Pro tier:</strong> Compare up to 5 products, AI verdict, price history, image export. Requires a paid subscription.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Pro subscriptions and payments</h2>
        <p>
          Pro subscriptions are billed monthly ($2.99/month) or annually ($19.99/year) through Stripe.
          By subscribing, you authorize recurring charges at the selected interval.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cancellation:</strong> You may cancel at any time. Access continues until the end of your current billing period.</li>
          <li><strong>Refunds:</strong> Refund requests within 7 days of purchase will be honored. Contact us at the email below.</li>
          <li><strong>License keys:</strong> Your Pro license key is personal and non-transferable.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Reverse-engineer, decompile, or modify the Extension except as permitted by applicable law.</li>
          <li>Use the Service for any unlawful purpose.</li>
          <li>Share, resell, or redistribute Pro license keys.</li>
          <li>Attempt to circumvent usage limits or feature restrictions.</li>
          <li>Use automated tools to generate excessive API requests through the Extension.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Third-party services</h2>
        <p>
          The Extension interacts with third-party services that have their own terms:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Amazon:</strong> Product data is read from Amazon product pages. Amazon&apos;s terms of use apply to your use of Amazon&apos;s website. CompareCart is not affiliated with or endorsed by Amazon.</li>
          <li><strong>Anthropic:</strong> If you use AI features with your own API key, Anthropic&apos;s usage policies apply to those API calls.</li>
          <li><strong>Stripe:</strong> Payment processing is handled by Stripe, subject to Stripe&apos;s terms.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">6. Intellectual property</h2>
        <p>
          The Extension, Website, and all associated code, design, and content are owned by CompareCart.
          You are granted a limited, non-exclusive, non-transferable license to use the Service for
          personal, non-commercial comparison purposes.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">7. Disclaimer of warranties</h2>
        <p>
          The Service is provided &quot;as is&quot; without warranty of any kind. We do not guarantee that:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Product data extracted from Amazon will be accurate, complete, or up-to-date.</li>
          <li>The Extension will function without interruption, especially if Amazon changes their website structure.</li>
          <li>AI-generated verdicts or recommendations will be accurate or suitable for your needs.</li>
          <li>Price history data reflects actual historical Amazon pricing.</li>
        </ul>
        <p className="mt-2">
          You should verify product information on Amazon before making a purchase decision.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, CompareCart shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of the Service, including
          but not limited to purchase decisions made based on comparison data or AI recommendations.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">9. Termination</h2>
        <p>
          We may suspend or terminate your access to Pro features if you violate these terms.
          You may stop using the Service at any time by uninstalling the Extension.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">10. Changes to terms</h2>
        <p>
          We may update these terms from time to time. Changes will be posted on this page with an
          updated date. Continued use of the Service constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">11. Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:support@comparecart.app" className="text-orange-500">support@comparecart.app</a>.
        </p>
      </div>
    </div>
  );
}
