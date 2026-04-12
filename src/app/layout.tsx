import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompareCart — Amazon Product Comparison Tool | Compare Side-by-Side",
  description:
    "Free Chrome extension to compare Amazon products side-by-side. AI-powered specs extraction, smart verdicts, and one-click sharing. Stop switching tabs.",
  keywords: [
    "compare amazon products",
    "amazon product comparison",
    "side by side compare amazon",
    "amazon price comparison chrome",
    "best amazon comparison extension",
    "amazon comparison tool",
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
              <span className="text-2xl">🛒</span>
              CompareCart
            </a>
            <div className="flex items-center gap-3 sm:gap-6 text-sm">
              <a href="/comparisons" className="text-gray-600 hover:text-gray-900 no-underline hidden sm:inline">
                Comparisons
              </a>
              <a href="/pro" className="text-gray-600 hover:text-gray-900 no-underline hidden sm:inline">
                Pricing
              </a>
              {/* TODO: Replace with actual CWS listing URL */}
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
            <span>&copy; {new Date().getFullYear()} CompareCart. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="/pro" className="hover:text-gray-700 no-underline">Pricing</a>
              <a href="/privacy" className="hover:text-gray-700 no-underline">Privacy</a>
              <a href="/terms" className="hover:text-gray-700 no-underline">Terms</a>
              <a href="mailto:support@comparecart.app" className="hover:text-gray-700 no-underline">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
