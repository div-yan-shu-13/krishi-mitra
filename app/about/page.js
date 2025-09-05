"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const stagger = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.08 },
  }),
};

function Stat({ label, value, i }) {
  return (
    <motion.div
      custom={i}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      className="rounded-xl border border-slate-800 bg-slate-900 p-5"
    >
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-300 mt-1">{label}</div>
    </motion.div>
  );
}

function ValueCard({ emoji, title, desc, i }) {
  return (
    <motion.div
      custom={i}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition"
    >
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-3 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </motion.div>
  );
}

export default function AboutClient() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 p-8 md:p-12">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/20 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            KrishiMitra
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Growing decisions into outcomes
          </h1>
          <p className="mt-4 text-slate-300 text-lg md:text-xl">
            KrishiMitra turns weather and soil context into simple, timely
            guidance—so planning the next field task feels easy, not
            overwhelming.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat i={0} label="Supported crops (demo)" value="8+" />
          <Stat i={1} label="Realtime sources" value="2" />
          <Stat i={2} label="Advisory checks" value="3+" />
          <Stat i={3} label="Dark‑mode first" value="Yes" />
        </div>
      </section>

      {/* What we do */}
      <section className="mt-10">
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xl font-semibold text-white"
        >
          What we do
        </motion.h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            i={0}
            emoji="📈"
            title="Yield & Suitability"
            desc="See which crops fit your conditions now, with expected outcomes you can act on."
          />
          <ValueCard
            i={1}
            emoji="🌦️"
            title="Weather‑aware"
            desc="Use live temperature, humidity, and rainfall to time irrigation and field work."
          />
          <ValueCard
            i={2}
            emoji="🧪"
            title="Soil‑informed"
            desc="Bring pH and nutrients into decisions for balanced inputs and better resource use."
          />
          <ValueCard
            i={3}
            emoji="📋"
            title="Actionable advisory"
            desc="Short, stage‑wise tasks for irrigation, fertilization, and pest scouting—no jargon."
          />
          <ValueCard
            i={4}
            emoji="🔐"
            title="Secure & simple"
            desc="Fast sign‑in and private routes keep data safe without adding friction."
          />
          <ValueCard
            i={5}
            emoji="⚡"
            title="Performance‑first"
            desc="Clean typography and motion make the app feel crisp on any device."
          />
        </div>
      </section>

      {/* How it works (rewritten for clarity/UX) */}
      <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6">
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
              saved for the next visit.
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
              weather and soil context in seconds.
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
              See a clear estimate and a short checklist for irrigation,
              nutrients, and pest scouting—ready to use today.
            </p>
          </motion.div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">Step 4</p>
            <h4 className="mt-1 font-semibold text-white">Check back weekly</h4>
            <p className="mt-2 text-sm text-slate-300">
              Weather changes—return for quick updates so the plan stays fresh
              and practical.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">Step 5</p>
            <h4 className="mt-1 font-semibold text-white">
              You stay in control
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              Your data is private and portable—change crops, fields, or timing
              anytime you like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-emerald-700/20 via-emerald-600/10 to-transparent p-6">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="text-white font-semibold">Ready to explore?</div>
            <div className="text-sm text-slate-300">
              Sign in to unlock predictions and a tailored advisory checklist.
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/about"
              className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-slate-100 hover:bg-slate-800 transition"
            >
              Learn more
            </Link>
            <Link
              href="/predict"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500 transition"
            >
              Go to Predict
            </Link>
          </div>
        </motion.div>
      </section>

      {reduce ? (
        <p className="mt-4 text-xs text-slate-400">
          Animations are minimized due to reduced‑motion preference.
        </p>
      ) : null}
    </div>
  );
}
