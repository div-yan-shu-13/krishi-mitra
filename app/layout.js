// app/layout.js
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KrishiMitra — AI Crop Yield & Advisory",
  description:
    "AI-powered crop yield prediction and farm optimization for smallholders",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`dark ${geistSans.variable} ${geistMono.variable}`}
      >
        <body className="bg-dark-900 text-gray-100 min-h-screen antialiased">
          <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-900 via-dark-900 to-dark-800">
            <header className="border-b border-dark-700 bg-dark-900/70 backdrop-blur supports-[backdrop-filter]:bg-dark-900/60">
              <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700" />
                  <span className="text-lg font-semibold tracking-wide">
                    KrishiMitra
                  </span>
                </Link>

                <nav className="flex items-center gap-5 text-sm">
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

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500 transition">
                        Log in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-slate-100 hover:bg-slate-800 transition">
                        Sign up
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <a
                      href="/predict"
                      className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-slate-100 hover:bg-slate-800 transition"
                    >
                      Predict
                    </a>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox:
                            "ring-2 ring-emerald-500/60 rounded-full",
                        },
                      }}
                    />
                  </SignedIn>
                </nav>
              </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

            <footer className="mt-12 border-t border-dark-800">
              <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-400 flex items-center justify-between">
                <p>© {new Date().getFullYear()} KrishiMitra</p>
                <p className="text-gray-500">Built by Pointers with 💗</p>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
