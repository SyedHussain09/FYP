import { OnboardingFlow } from "../../components/onboarding/onboarding-flow";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-white">Tailor your guidance</h1>
        <p className="mx-auto max-w-2xl text-base text-white/70">
          Tell us where you are today and what future excites you. We will calibrate the AI models, job intelligence, and mentors to serve your next leap.
        </p>
      </div>
      <OnboardingFlow />
    </div>
  );
}
