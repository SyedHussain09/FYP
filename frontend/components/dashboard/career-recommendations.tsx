"use client";

import { useMemo } from "react";
import { Recommendation } from "../../lib/types";
import { toCurrency } from "../../lib/utils";
import { BadgeCheck, TrendingUp } from "lucide-react";

interface Props {
  items: Recommendation[];
}

export function CareerRecommendations({ items }: Props) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => b.fitScore - a.fitScore).slice(0, 5),
    [items]
  );

  return (
    <section className="glass card-hover space-y-6 rounded-3xl p-6 shadow-2xl shadow-purple-500/10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Top matches</h2>
          <p className="text-sm text-slate-400">Ranked using your profile, live demand, salary uplift, and transferable skills.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/20 px-4 py-2 text-xs font-bold text-emerald-200 shadow-lg">
          <BadgeCheck className="h-4 w-4" /> AI verified
        </span>
      </header>
      <div className="space-y-4">
        {sorted.map((item) => (
          <article
            key={item.role}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/20 p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-sky-400/60 hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">{item.role}</h3>
                <p className="text-xs uppercase tracking-widest text-white/50">Fit score {Math.round(item.fitScore)}%</p>
              </div>
              <div className="text-right text-sm text-white/60">
                <p className="text-white/80">Median salary {toCurrency(item.salaryP50)}</p>
                <p className="text-white/40">P90 {toCurrency(item.salaryP90)}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-400/40 bg-brand-500/10 px-2.5 py-1 text-brand-100">
                <TrendingUp className="h-3 w-3" /> Demand +{item.demandSignal.toFixed(1)}%
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-white/60">
                Confidence {item.confidence.toFixed(1)}/1.0
              </span>
            </div>
            <ul className="text-sm text-white/70">
              {item.rationale.slice(0, 3).map((line, index) => (
                <li key={`${item.role}-${index}`} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
