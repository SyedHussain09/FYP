export interface ProfileSummary {
  id: string;
  name: string;
  careerStage: string;
  interests: string[];
  skills: string[];
  targetRoles: string[];
  location: string;
}

export interface Recommendation {
  role: string;
  fitScore: number;
  demandSignal: number;
  salaryP50: number;
  salaryP90: number;
  confidence: number;
  rationale: string[];
}

export interface SkillGap {
  skill: string;
  level: number;
  marketDemand: number;
  timeToUpSkillWeeks: number;
}

export interface LearningModule {
  title: string;
  provider: string;
  hours: number;
  cost: number;
  relevance: number;
  url: string;
}

export interface JobAlert {
  id: string;
  role: string;
  company: string;
  location: string;
  salaryRange: string;
  postedAt: string;
  applyUrl: string;
  skills: string[];
}

export interface MarketSignal {
  label: string;
  value: string;
  delta: number;
}

export interface DashboardPayload {
  profile: ProfileSummary;
  recommendations: Recommendation[];
  skillGaps: SkillGap[];
  learningPath: LearningModule[];
  jobAlerts: JobAlert[];
  marketPulse: MarketSignal[];
  salaryTrajectory: Array<{ year: number; salary: number }>;
}
