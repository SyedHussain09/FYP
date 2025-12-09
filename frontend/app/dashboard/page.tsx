import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { CareerRecommendations } from "../../components/dashboard/career-recommendations";
import { SkillGapRadar } from "../../components/dashboard/skill-gap-radar";
import { LearningPath } from "../../components/dashboard/learning-path";
import { JobAlerts } from "../../components/dashboard/job-alerts";
import { ProfileSummaryPanel } from "../../components/dashboard/profile-summary";
import { SalaryTrendChart } from "../../components/dashboard/salary-trend-chart";
import type { DashboardPayload } from "../../lib/types";

const API_URL =
  process.env.CAREER_COMPASS_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000/api/v1";

async function getDashboard(profileId?: string): Promise<DashboardPayload> {
  const query = profileId ? `?profileId=${profileId}` : "";
  const res = await fetch(`${API_URL}/dashboard${query}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-session-id": cookies().get("sessionId")?.value ?? "anon"
    }
  });

  if (!res.ok) {
    throw new Error("Unable to fetch dashboard data");
  }

  return res.json();
}

interface DashboardPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const profileId = typeof searchParams.profileId === "string" ? searchParams.profileId : undefined;

  try {
    const data = await getDashboard(profileId);

    if (!data) {
      notFound();
    }

    return (
      <div className="space-y-6 lg:space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Your Career Dashboard</h1>
          <p className="mt-2 text-slate-400">Personalized insights and recommendations</p>
        </div>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
          <ProfileSummaryPanel profile={data.profile} />
          <Suspense fallback={<div className="glass h-full min-h-[300px] animate-pulse rounded-3xl" />}>
            <CareerRecommendations items={data.recommendations} />
          </Suspense>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <SkillGapRadar items={data.skillGaps} />
          <SalaryTrendChart data={data.salaryTrajectory} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <LearningPath modules={data.learningPath} />
          <JobAlerts items={data.jobAlerts} />
        </section>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
