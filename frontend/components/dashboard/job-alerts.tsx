"use client";

import { JobAlert } from "../../lib/types";
import { Briefcase } from "lucide-react";

interface Props {
  items: JobAlert[];
}

export function JobAlerts({ items }: Props) {
  return (
    <section className="glass card-hover space-y-6 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Live roles worth applying</h2>
          <p className="text-sm text-slate-400">Filtered using your goals, salary targets, and remote/on-site preferences.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20">
          <Briefcase className="h-5 w-5 text-emerald-400" />
        </div>
      </header>
      <div className="space-y-3">
        {items.map((job) => (
          <article key={job.id} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/20 p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{job.role}</h3>
                <p className="mt-1 text-sm text-slate-400">{job.company} · {job.location}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-center font-bold text-emerald-300">
                  {job.salaryRange}
                </span>
                <span className="text-slate-500">
                  {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.slice(0, 6).map((skill) => (
                <span key={`${job.id}-${skill}`} className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                  {skill}
                </span>
              ))}
            </div>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition-all hover:gap-3 hover:text-emerald-300"
            >
              View & apply →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
