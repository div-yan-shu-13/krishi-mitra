// app/page.js
import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <p className="text-emerald-400/90 font-medium tracking-wide">
            KrishiMitra
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Smarter farming decisions, simplified
          </h1>
          <p className="mt-4 text-slate-300 text-lg md:text-xl">
            Plan crops, irrigation, and inputs with live weather and soil
            context—made effortless for every field.
          </p>

          {/* Public: no prediction link; Authenticated: show Predict */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
            >
              Explore Features
            </a>

            <SignedOut>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition">
                  Create free account
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-slate-100 hover:bg-slate-800 transition">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/predict"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-slate-100 hover:bg-slate-800 transition"
              >
                Go to Predict
              </Link>
            </SignedIn>
          </div>

          <p className="mt-3 text-sm text-slate-300">
            Join KrishiMitra for location‑aware insights and a streamlined
            advisory flow.
          </p>
        </div>

        {/* Soft top vignette for legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
        />
      </section>

      {/* Features */}
      <section id="features" className="mt-12">
        <h2 className="text-xl font-semibold text-white">Features</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">📈</div>
            <h3 className="mt-3 font-semibold text-white">
              Yield Intelligence
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Crop suitability and expected outcomes with data‑driven insights.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">🌦️</div>
            <h3 className="mt-3 font-semibold text-white">Live Weather</h3>
            <p className="mt-2 text-sm text-slate-300">
              Auto-detect location to fetch temperature, humidity, and rain
              risk.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">🧪</div>
            <h3 className="mt-3 font-semibold text-white">Soil Snapshot</h3>
            <p className="mt-2 text-sm text-slate-300">
              Quick view of soil pH and nutrients to guide balanced inputs.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">📋</div>
            <h3 className="mt-3 font-semibold text-white">
              Actionable Advisory
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Stage‑wise tasks for irrigation, fertilization, and IPM.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">🔐</div>
            <h3 className="mt-3 font-semibold text-white">Secure Access</h3>
            <p className="mt-2 text-sm text-slate-300">
              Clerk authentication for low‑friction sign‑in and data safety.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
            <div className="text-2xl">⚡</div>
            <h3 className="mt-3 font-semibold text-white">Fast UI</h3>
            <p className="mt-2 text-sm text-slate-300">
              Optimized fonts and styling for a crisp, app‑like experience.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <h2 className="text-xl font-semibold text-white">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 1</p>
            <h4 className="mt-1 font-semibold text-white">Create an account</h4>
            <p className="mt-2 text-sm text-slate-300">
              Sign up to unlock predictions and save field preferences.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 2</p>
            <h4 className="mt-1 font-semibold text-white">Auto-load context</h4>
            <p className="mt-2 text-sm text-slate-300">
              Use location detection to fetch weather and soil context quickly.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 3</p>
            <h4 className="mt-1 font-semibold text-white">Get advisory</h4>
            <p className="mt-2 text-sm text-slate-300">
              Review guidance and move to the field with confidence.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-500 transition">
                Create free account
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-slate-100 hover:bg-slate-800 transition">
                Log in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/predict"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-500 transition"
            >
              Go to Predict
            </Link>
          </SignedIn>
        </div>
      </section>
    </div>
  );
}
