import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { InsightHighlights } from "../components/insight-highlights";
import { MarketPulseTicker } from "../components/market-pulse-ticker";
import { Navigation } from "../components/navigation";

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen flex-col gap-16 px-4 py-24 sm:px-6 lg:px-8">
      <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
        <div className="space-y-6 lg:space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-purple-500/10 px-5 py-2.5 text-sm font-semibold text-sky-100 shadow-lg backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
            Live labor-market intelligence · Refreshed hourly
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Design your career with{" "}
            <span className="gradient-text">real-time data</span>, personalized guidance, and curated learning paths.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Career Compass blends AI-driven recommendations, live market data, and human mentorship to help you prioritize the skills, roles, and opportunities that matter right now.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/onboarding"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 px-8 py-4 font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-sky-500/40"
            >
              Start personalization 
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/40 hover:bg-white/10"
            >
              Explore live dashboard
            </Link>
          </div>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3 lg:mt-12">
            <div className="glass rounded-2xl p-5 transition-all hover:scale-105">
              <dt className="text-xs font-semibold uppercase tracking-wider text-sky-400">Data sources</dt>
              <dd className="mt-3 text-3xl font-bold text-white">35+</dd>
              <p className="mt-1 text-xs text-slate-400">Live integrations</p>
            </div>
            <div className="glass rounded-2xl p-5 transition-all hover:scale-105">
              <dt className="text-xs font-semibold uppercase tracking-wider text-purple-400">Career trajectories</dt>
              <dd className="mt-3 text-3xl font-bold text-white">120k+</dd>
              <p className="mt-1 text-xs text-slate-400">Modeled pathways</p>
            </div>
            <div className="glass rounded-2xl p-5 transition-all hover:scale-105">
              <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Salary uplift</dt>
              <dd className="mt-3 text-3xl font-bold text-emerald-400">18%</dd>
              <p className="mt-1 text-xs text-slate-400">Median increase</p>
            </div>
          </dl>
        </div>
        <div className="glass relative rounded-3xl p-6 shadow-2xl shadow-sky-500/10 lg:block">
          <div className="absolute right-6 top-6 z-10 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-200 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300"></span>
            </span>
            Live signals
          </div>
          <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-gradient-to-br from-white/5 to-white/10" />}>
            <InsightHighlights />
          </Suspense>
        </div>
      </header>

      <section className="glass space-y-6 rounded-3xl p-6 shadow-2xl shadow-purple-500/10 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Market pulse</h2>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            Streaming high-impact trends pulled from labor, salary, and learning data sources.
          </p>
        </div>
        <MarketPulseTicker />
      </section>
    </div>
    </>
  );
}
