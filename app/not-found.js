import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-600/10 ring-1 ring-emerald-700/30 flex items-center justify-center">
          <span className="text-3xl">🌾</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-slate-300">
          The page requested doesn’t exist or has moved. Please check the URL or
          return to the homepage.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-white font-medium shadow hover:bg-emerald-500 transition"
          >
            Go Home
          </Link>
          <Link
            href="/predict"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-slate-100 hover:bg-slate-800 transition"
          >
            Start Prediction
          </Link>
        </div>
      </div>
    </div>
  );
}
