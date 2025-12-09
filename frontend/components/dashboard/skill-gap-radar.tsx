"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { SkillGap } from "../../lib/types";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  items: SkillGap[];
}

export function SkillGapRadar({ items }: Props) {
  const labels = items.map((item) => item.skill);
  const dataset = {
    labels,
    datasets: [
      {
        label: "Your profile",
        data: items.map((item) => item.level),
        backgroundColor: "rgba(14, 165, 233, 0.25)",
        borderColor: "rgba(14, 165, 233, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(14, 165, 233, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: "Market expectation",
        data: items.map((item) => item.marketDemand),
        backgroundColor: "rgba(139, 92, 246, 0.25)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(139, 92, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  return (
    <section className="glass card-hover space-y-6 rounded-3xl p-6 shadow-2xl shadow-purple-500/10">
      <header>
        <h2 className="text-xl font-bold text-white">Skill alignment</h2>
        <p className="text-sm text-slate-400">Focus on the highest deltas to accelerate your transition.</p>
      </header>
      <div className="h-80 sm:h-96">
        <Radar
          data={dataset}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "rgba(255,255,255,0.75)"
                }
              }
            },
            scales: {
              r: {
                angleLines: {
                  color: "rgba(148, 163, 184, 0.2)"
                },
                grid: {
                  color: "rgba(148, 163, 184, 0.15)"
                },
                pointLabels: {
                  color: "rgba(226, 232, 240, 0.9)",
                  font: {
                    size: 13,
                    weight: "bold"
                  }
                },
                ticks: {
                  backdropColor: "transparent",
                  color: "rgba(148, 163, 184, 0.6)",
                  stepSize: 20,
                  font: {
                    size: 11
                  }
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }}
        />
      </div>
    </section>
  );
}
