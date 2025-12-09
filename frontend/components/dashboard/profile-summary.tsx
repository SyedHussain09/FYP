"use client";

import { ProfileSummary } from "../../lib/types";
import { Sparkles, MapPin, Target } from "lucide-react";

interface Props {
  profile: ProfileSummary;
}

export function ProfileSummaryPanel({ profile }: Props) {
  return (
    <section className="glass card-hover space-y-5 rounded-3xl p-6 shadow-2xl shadow-sky-500/10">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20">
          <Sparkles className="h-5 w-5 text-sky-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{profile.name || "Your profile"}</h2>
          <p className="text-sm text-slate-400">{profile.careerStage.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
        </div>
      </header>
      <div className="flex flex-wrap gap-4 text-xs text-white/60">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <MapPin className="h-3.5 w-3.5" /> {profile.location}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5" /> {profile.targetRoles.slice(0, 2).join(", ")}
        </span>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-white/40">Focus areas</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
          {profile.interests.map((interest) => (
            <span key={interest} className="rounded-full border border-brand-300/20 bg-brand-500/10 px-3 py-1 text-brand-100">
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-white/40">Strengths</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
          {profile.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-white/10 bg-black/30 px-3 py-1">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
