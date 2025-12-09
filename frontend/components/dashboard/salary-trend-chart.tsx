"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface SalaryPoint {
  year: number;
  salary: number;
}

interface Props {
  data: SalaryPoint[];
}

export function SalaryTrendChart({ data }: Props) {
  const dataset = {
    labels: data.map((point) => point.year),
    datasets: [
      {
        label: "Projected median salary",
        data: data.map((point) => point.salary),
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.3)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2
      }
    ]
  };

  return (
    <section className="glass card-hover space-y-6 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10">
      <header>
        <h2 className="text-xl font-bold text-white">Salary trajectory</h2>
        <p className="text-sm text-slate-400">Forecast based on role adoption velocity, location, and skill premium.</p>
      </header>
      <Line
        data={dataset}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                color: "rgba(226, 232, 240, 0.9)",
                font: {
                  size: 13,
                  weight: "bold"
                },
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 12,
              titleFont: {
                size: 14,
                weight: "bold"
              },
              bodyFont: {
                size: 13
              },
              borderColor: "rgba(16, 185, 129, 0.5)",
              borderWidth: 1
            }
          },
          scales: {
            x: {
              ticks: {
                color: "rgba(148, 163, 184, 0.8)",
                font: {
                  size: 12,
                  weight: "bold"
                }
              },
              grid: {
                color: "rgba(148, 163, 184, 0.1)"
              }
            },
            y: {
              ticks: {
                color: "rgba(148, 163, 184, 0.8)",
                font: {
                  size: 12
                },
                callback: (value: string | number) => `$${Number(value) / 1000}k`
              },
              grid: {
                color: "rgba(148, 163, 184, 0.1)"
              }
            }
          }
        }}
      />
    </section>
  );
}
