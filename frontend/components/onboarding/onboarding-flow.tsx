"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { API_BASE_URL, cn } from "../../lib/utils";

interface OnboardingForm {
  name: string;
  careerStage: "student" | "early" | "mid" | "transition";
  interests: string[];
  skills: string[];
  targetRoles: string[];
  location: string;
  salaryGoal: number;
}

const INTEREST_OPTIONS = [
  "Artificial Intelligence & Machine Learning",
  "Data Engineering & Analytics",
  "Cloud & Infrastructure",
  "Platform Engineering & DevOps",
  "Cybersecurity & Privacy",
  "Product Management & Strategy",
  "Full-Stack Development",
  "System Design & Architecture",
  "MLOps & AI Infrastructure",
  "Engineering Leadership",
  "Developer Experience (DevX)",
  "Web3 & Blockchain"
];

const SKILL_OPTIONS = [
  "Python",
  "TypeScript/JavaScript",
  "Go / Rust",
  "System Design",
  "AWS / Azure / GCP",
  "Kubernetes / Docker",
  "SQL & NoSQL Databases",
  "Machine Learning (TensorFlow/PyTorch)",
  "React / Next.js",
  "API Design & Microservices",
  "CI/CD & Infrastructure as Code",
  "Data Structures & Algorithms",
  "Technical Leadership",
  "Stakeholder Communication",
  "Agile & Project Management"
];

const ROLE_OPTIONS = [
  "Senior Software Engineer",
  "Staff / Principal Engineer",
  "Machine Learning Engineer",
  "Data Engineer / Architect",
  "Platform / Infrastructure Engineer",
  "Engineering Manager / Director",
  "Solutions Architect",
  "DevOps / SRE Lead",
  "Technical Product Manager",
  "Security Engineer",
  "Full-Stack Engineer",
  "AI/LLM Engineer"
];

const STEPS = ["Profile", "Interests", "Skills", "Targets"] as const;

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: OnboardingForm = {
    name: "",
    careerStage: "mid",
    interests: [],
    skills: [],
    targetRoles: [],
    location: "Remote / Hybrid",
    salaryGoal: 150000
  };

  const form = useForm<OnboardingForm>({
    defaultValues
  });

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const nextStep = () => setStep((current: number) => Math.min(current + 1, STEPS.length - 1));
  const prevStep = () => setStep((current: number) => Math.max(current - 1, 0));

  const submit = async (values: OnboardingForm) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const { profile_id } = await response.json();
      router.push(`/dashboard?profileId=${profile_id}`);
    } catch (error) {
      console.error(error);
      alert("We could not personalize your dashboard right now. Please try again in a bit.");
      setIsSubmitting(false);
    }
  };

  const onSubmit = form.handleSubmit(async (values: OnboardingForm) => {
    if (step < STEPS.length - 1) {
      nextStep();
      return;
    }
    await submit(values);
  });

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <Controller
              control={form.control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="block text-sm">
                  <span className="text-white/60">Preferred name</span>
                  <input
                    {...field}
                    placeholder="e.g. Hussain"
                    className="mt-2 w-full rounded-xl border-2 border-white/20 bg-black/40 px-5 py-3.5 text-white placeholder:text-slate-500 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                </label>
              )}
            />
            <Controller
              control={form.control}
              name="careerStage"
              render={({ field }) => (
                <label className="block text-sm">
                  <span className="font-semibold text-white">Current career stage</span>
                  <select
                    {...field}
                    className="mt-2 w-full rounded-xl border-2 border-white/20 bg-black/40 px-5 py-3.5 text-white backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  >
                    <option value="student">Student / New Graduate (0-1 years)</option>
                    <option value="early">Junior Engineer (1-3 years)</option>
                    <option value="mid">Mid-Level / Senior (3-8 years)</option>
                    <option value="transition">Staff+ / Leadership (8+ years)</option>
                  </select>
                </label>
              )}
            />
            <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <label className="block text-sm">
                  <span className="font-semibold text-white">Preferred work location</span>
                  <input
                    {...field}
                    placeholder="e.g., Remote Worldwide, San Francisco, London, Hybrid"
                    className="mt-2 w-full rounded-xl border-2 border-white/20 bg-black/40 px-5 py-3.5 text-white placeholder:text-slate-500 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                </label>
              )}
            />
          </div>
        );
      case 1:
        return (
          <OptionGrid
            title="What areas drive your passion?"
            description="Select up to 4 domains. We'll match you with roles and learning paths aligned to these interests."
            options={INTEREST_OPTIONS}
            selected={form.watch("interests")}
            onChange={(value) => form.setValue("interests", value)}
          />
        );
      case 2:
        return (
          <OptionGrid
            title="Your core technical & soft skills"
            description="Select up to 4 skills where you have hands-on experience or strong proficiency."
            options={SKILL_OPTIONS}
            selected={form.watch("skills")}
            onChange={(value) => form.setValue("skills", value)}
          />
        );
      case 3:
        return (
          <OptionGrid
            title="Target roles for the next 12-18 months"
            description="Choose up to 4 roles. We'll track market demand, salaries, and curate personalized learning paths."
            options={ROLE_OPTIONS}
            selected={form.watch("targetRoles")}
            onChange={(value) => form.setValue("targetRoles", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass card-hover mx-auto max-w-3xl space-y-8 rounded-3xl p-8 shadow-2xl shadow-sky-500/10 sm:p-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20">
          <Sparkles className="h-5 w-5 text-sky-400" />
        </div>
        <span className="text-sm font-bold uppercase tracking-wider text-sky-300">Personalized setup</span>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-white">{STEPS[step]}</p>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Step {step + 1} / {STEPS.length}
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-purple-600 transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="min-h-[300px] space-y-8">{renderStep()}</div>

      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-semibold transition-all",
            step === 0 
              ? "cursor-not-allowed border-white/10 text-white/30" 
              : "border-white/20 text-white hover:scale-105 hover:border-white/40 hover:bg-white/5"
          )}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-sky-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : step === STEPS.length - 1 ? "Generate my roadmap" : "Next"}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}

interface OptionGridProps {
  title: string;
  description: string;
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}

function OptionGrid({ title, description, options, selected, onChange }: OptionGridProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
      return;
    }
    if (selected.length >= 4) {
      return;
    }
    onChange([...selected, value]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                "rounded-xl border px-4 py-5 text-left text-sm font-medium shadow-lg transition-all hover:scale-105",
                isSelected
                  ? "border-sky-400 bg-gradient-to-br from-sky-500/20 to-purple-500/20 text-white shadow-sky-500/30"
                  : "border-white/10 bg-black/30 text-slate-300 hover:border-white/30 hover:bg-black/40"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
