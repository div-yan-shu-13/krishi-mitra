import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            KrishiMitra
          </h1>
          <p className="mt-4 text-slate-300 text-lg md:text-xl">
            AI-powered crop yield prediction and actionable farm advisory for
            irrigation, fertilization, and pest control—tailored to local
            conditions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/predict"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
            >
              Start Prediction
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Built with Next.js App Router and Tailwind CSS.
          </p>
        </div>

        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl"
        />
      </section>

      {/* Features */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
          <div className="text-2xl">🌾</div>
          <h3 className="mt-3 font-semibold text-white">Yield Prediction</h3>
          <p className="mt-2 text-sm text-slate-300">
            Predict yields using historical data, weather, and soil metrics to
            plan sowing and harvesting better.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
          <div className="text-2xl">💧</div>
          <h3 className="mt-3 font-semibold text-white">Smart Advisory</h3>
          <p className="mt-2 text-sm text-slate-300">
            Get timely irrigation, fertilization, and pest control
            recommendations based on real-time conditions.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition">
          <div className="text-2xl">🗣️</div>
          <h3 className="mt-3 font-semibold text-white">
            Localized Experience
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Simple, mobile-friendly UI with support for regional languages for
            broader accessibility.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 1</p>
            <h4 className="mt-1 font-semibold text-white">
              Enter crop & location
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              Provide basic details like crop type, district, and sowing date to
              start.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 2</p>
            <h4 className="mt-1 font-semibold text-white">
              We fetch live data
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              The system augments inputs with weather and soil information for
              your region.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Step 3</p>
            <h4 className="mt-1 font-semibold text-white">
              Get predictions & advice
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              View yield estimates and actionable irrigation, fertilization, and
              pest management tasks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
