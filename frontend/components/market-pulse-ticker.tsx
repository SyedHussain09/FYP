"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { API_BASE_URL } from "../lib/utils";
import { TrendingUp } from "lucide-react";

interface MarketPulseItem {
  label: string;
  value: string;
  delta: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MarketPulseTicker() {
  const { data } = useSWR<{ items: MarketPulseItem[] }>(
    `${API_BASE_URL}/insights/pulse`,
    fetcher,
    {
      refreshInterval: 1000 * 60
    }
  );
  const items = useMemo(() => data?.items ?? [], [data]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) {
      return;
    }
    const timer = setInterval(() => {
  setIndex((prev: number) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-purple-500/10 px-8 py-6 backdrop-blur-sm">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
        <span className="text-sm font-semibold text-sky-300">Awaiting live signals…</span>
      </div>
    );
  }

  const current = items[index];

  return (
    <div className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-black/50 to-black/30 px-8 py-6 backdrop-blur-sm transition-all hover:border-sky-400/40 hover:shadow-xl hover:shadow-sky-500/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 transition-all group-hover:scale-110">
          <TrendingUp className="h-5 w-5 text-sky-400" />
        </div>
        <span className="text-sm font-bold uppercase tracking-wider text-sky-300">Market pulse</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <span className="text-sm font-medium text-slate-400">{current.label}</span>
        <span className="text-lg font-bold text-white">{current.value}</span>
        <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${
          current.delta >= 0 
            ? "bg-emerald-500/20 text-emerald-300" 
            : "bg-rose-500/20 text-rose-300"
        }`}>
          {current.delta >= 0 ? "+" : ""}
          {current.delta.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
