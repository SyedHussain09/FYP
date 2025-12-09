"use client";

import { LearningModule } from "../../lib/types";
import { GraduationCap } from "lucide-react";
import { toCurrency } from "../../lib/utils";

interface Props {
  modules: LearningModule[];
}

export function LearningPath({ modules }: Props) {
  return (
    <section className="glass card-hover space-y-6 rounded-3xl p-6 shadow-2xl shadow-sky-500/10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Learning sprint</h2>
          <p className="text-sm text-slate-400">Curated from Coursera, edX, O&apos;Reilly, and niche academies based on hiring data.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20">
          <GraduationCap className="h-5 w-5 text-sky-400" />
        </div>
      </header>
      <ul className="space-y-3">
        {modules.map((module) => (
          <li key={module.title} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/20 p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">{module.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{module.provider}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-lg bg-sky-500/20 px-3 py-1.5 font-semibold text-sky-300">
                  {module.hours} hrs
                </span>
                <span className="rounded-lg bg-purple-500/20 px-3 py-1.5 font-semibold text-purple-300">
                  {module.relevance}% match
                </span>
                <span className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-300">
                  {toCurrency(module.cost)}
                </span>
              </div>
            </div>
            <a
              href={module.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-400 transition-all hover:gap-3 hover:text-sky-300"
            >
              View module →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
