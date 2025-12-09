"use client";

import useSWR from "swr";
import { API_BASE_URL, toCurrency } from "../lib/utils";
import { Skeleton } from "./skeleton";

interface HighlightResponse {
  hottest_roles: Array<{
    title: string;
    growth: number;
    salary_p50: number;
  }>;
  trending_skills: Array<{
    name: string;
    delta: number;
  }>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function InsightHighlights() {
  const { data, isLoading } = useSWR<HighlightResponse>(
    `${API_BASE_URL}/insights/highlights`,
    fetcher,
    { refreshInterval: 1000 * 60 * 5 }
  );

  if (isLoading || !data || !data.hottest_roles || !data.trending_skills) {
    return <Skeleton className="h-72 w-full rounded-2xl sm:h-80" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-5 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Fast-rising roles</p>
        <ul className="mt-4 space-y-3">
          {data.hottest_roles.slice(0, 3).map((role: HighlightResponse["hottest_roles"][number]) => (
            <li key={role.title} className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{role.title}</span>
              <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300">
                +{role.growth.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-sky-500/5 p-5 backdrop-blur-sm transition-all hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/20">
        <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Median salaries</p>
        <ul className="mt-4 space-y-3">
          {data.hottest_roles.slice(0, 3).map((role: HighlightResponse["hottest_roles"][number]) => (
            <li key={`${role.title}-salary`} className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-300">{role.title}</span>
              <span className="text-base font-bold text-sky-400">{toCurrency(role.salary_p50)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-5 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20">
        <p className="text-xs font-bold uppercase tracking-wider text-purple-400">Skills gaining momentum</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {data.trending_skills.slice(0, 8).map((skill: HighlightResponse["trending_skills"][number]) => (
            <li key={skill.name} className="rounded-lg border border-amber-400/30 bg-amber-400/20 px-3 py-1.5 text-xs font-bold text-amber-200 transition-all hover:scale-105">
              {skill.name} · +{skill.delta.toFixed(1)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
