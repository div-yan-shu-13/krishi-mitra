// app/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const float = (delay = 0) => ({
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" },
  },
});

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Split hero */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {/* Left: copy and CTAs */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <p className="text-emerald-400/90 font-medium tracking-wide">
              Krishi Mitra
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Smarter farming decisions, simplified
            </h1>
            <p className="mt-4 text-slate-300 text-lg md:text-xl">
              Turn live weather and soil context into a simple, timely plan for
              irrigation, nutrients, and scouting—without overwhelm or
              guesswork.
            </p>

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
              Built with accessibility and speed in mind—ready for real field
              decisions.
            </p>
          </motion.div>

          {/* Right: big brand image with gentle motion */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden"
          >
            {/* Subtle gradient backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_30%_20%,rgba(16,185,129,0.25),transparent_60%),radial-gradient(60%_40%_at_80%_70%,rgba(59,130,246,0.20),transparent_60%)]" />

            {/* Animated logo wrapper (animate the container, not the Image) */}
            <div className="relative z-10 h-full p-8 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <motion.div {...(!reduce ? float(0.2) : {})}>
                  <Image
                    src="/brand/logo.png" // place your logo file under public/brand/logo.png
                    alt="Krishi Mitra"
                    width={160}
                    height={160}
                    priority
                    className="h-28 w-28 md:h-40 md:w-40 rounded-2xl"
                  />
                </motion.div>

                {/* Soft pulsating ring */}
                <motion.div
                  className="pointer-events-none absolute -inset-3 rounded-3xl ring-1 ring-emerald-500/20"
                  animate={!reduce ? { opacity: [0.6, 0.9, 0.6] } : {}}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-white tracking-wide">
                Krishi Mitra
              </h2>
              <p className="mt-2 max-w-sm text-slate-300">
                A clean, modern identity for practical insights—built for real
                farms and real days.
              </p>
            </div>

            {/* Floating accents */}
            {!reduce && (
              <>
                <motion.div
                  className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-emerald-500/20 blur-2xl"
                  {...float(0.1)}
                />
                <motion.div
                  className="absolute -bottom-10 left-12 h-32 w-32 rounded-full bg-sky-500/20 blur-2xl"
                  {...float(0.3)}
                />
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-12">
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl font-semibold text-white"
        >
          Features
        </motion.h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "📈",
              "Yield & Suitability",
              "See which crops fit your conditions now, with expected outcomes you can act on.",
            ],
            [
              "🌦️",
              "Weather‑aware",
              "Use live temperature, humidity, and rainfall to time irrigation and field work.",
            ],
            [
              "🧪",
              "Soil‑informed",
              "Bring pH and nutrients into decisions for balanced inputs and better resource use.",
            ],
            [
              "📋",
              "Actionable advisory",
              "Short, stage‑wise tasks for irrigation, fertilization, and pest scouting.",
            ],
            [
              "🔐",
              "Secure access",
              "Clerk‑powered sign‑in keeps your data private and portable.",
            ],
            [
              "⚡",
              "Fast UI",
              "Clean typography and motion for a crisp, app‑like experience.",
            ],
          ].map(([icon, title, desc], i) => (
            <motion.div
              key={title}
              variants={fadeUp(0.06 + i * 0.03)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              whileHover={!reduce ? { y: -4, scale: 1.02 } : {}}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition"
            >
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-3 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl font-semibold text-white"
        >
          How it works
        </motion.h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <motion.div
            variants={fadeUp(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">Step 1</p>
            <h4 className="mt-1 font-semibold text-white">Sign in (once)</h4>
            <p className="mt-2 text-sm text-slate-300">
              Create a quick account to unlock predictions and keep preferences
              saved.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">Step 2</p>
            <h4 className="mt-1 font-semibold text-white">
              Tell us about your field
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              Pick a crop and sowing date—tap “Use my location” to auto‑fill
              weather and soil.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">Step 3</p>
            <h4 className="mt-1 font-semibold text-white">Get a simple plan</h4>
            <p className="mt-2 text-sm text-slate-300">
              See an estimate and a short checklist for irrigation, nutrients,
              and scouting.
            </p>
          </motion.div>
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

      {/* Reduced motion hint */}
      {reduce ? (
        <p className="mt-4 text-xs text-slate-400">
          Animations are minimized due to reduced‑motion preference.
        </p>
      ) : null}
    </div>
  );
}
