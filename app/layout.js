import "./globals.css";

export const metadata = {
  title: "KrishiMitra — AI Crop Yield & Advisory",
  description:
    "AI-powered crop yield prediction and farm optimization for smallholders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-gray-100 min-h-screen antialiased">
        <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-900 via-dark-900 to-dark-800">
          <header className="border-b border-dark-700 bg-dark-900/70 backdrop-blur supports-[backdrop-filter]:bg-dark-900/60">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700" />
                <span className="text-lg font-semibold tracking-wide">
                  KrishiMitra
                </span>
              </div>
              <nav className="flex items-center gap-6 text-sm">
                <a
                  className="text-gray-300 hover:text-white transition-colors"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="text-gray-300 hover:text-white transition-colors"
                  href="/predict"
                >
                  Predict
                </a>
                <a
                  className="text-gray-300 hover:text-white transition-colors"
                  href="/insights"
                >
                  Insights
                </a>
                <a
                  className="text-gray-300 hover:text-white transition-colors"
                  href="/about"
                >
                  About
                </a>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

          <footer className="mt-12 border-t border-dark-800">
            <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-400 flex items-center justify-between">
              <p>© {new Date().getFullYear()} KrishiMitra</p>
              <p className="text-gray-500">Built with Next.js + Tailwind</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
