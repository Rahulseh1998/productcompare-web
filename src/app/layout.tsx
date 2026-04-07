import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProductCompare for Amazon — Stop switching tabs. Compare in one click.",
  description:
    "Free Chrome extension to compare Amazon products side-by-side. AI-powered attribute extraction, price history, and smart verdicts.",
  keywords: [
    "amazon product compare",
    "amazon comparison tool",
    "compare amazon prices",
    "amazon side by side",
    "price tracker amazon",
    "chrome extension amazon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-geist-sans)]">
        {/* Nav */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-3">
            <a href="/" className="flex items-center gap-2 text-gray-900 font-bold text-lg no-underline">
              <span className="text-2xl">⚖️</span>
              ProductCompare
            </a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/pro" className="text-gray-600 hover:text-gray-900 no-underline">
                Pricing
              </a>
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition no-underline"
              >
                Install Free →
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-8">
          <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>&copy; {new Date().getFullYear()} ProductCompare. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="/pro" className="hover:text-gray-700 no-underline">Pricing</a>
              <a href="/privacy" className="hover:text-gray-700 no-underline">Privacy</a>
              <a href="/terms" className="hover:text-gray-700 no-underline">Terms</a>
              <a href="mailto:support@productcompare.app" className="hover:text-gray-700 no-underline">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
