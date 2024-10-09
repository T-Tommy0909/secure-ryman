"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CompanyData {
  name: string;
  industry: string;
  employeeCount: string | null;
  averageScore: number;
  annualBudget: string;
  scores: number[];
}

export default function SecurityComparison() {
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSecurityData();
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = ["基本", "従業員", "組織"];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        同業他社の点数・セキュリティ予算
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {companyData.map((company, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{company.name}</h2>
            <div className="mb-4">
              <p>
                <span className="font-medium">業界:</span> {company.industry}
              </p>
              {company.employeeCount && (
                <p>
                  <span className="font-medium">社員数:</span>{" "}
                  {company.employeeCount}
                </p>
              )}
              <p>
                <span className="font-medium">平均点:</span>{" "}
                {company.averageScore.toFixed(1)}
              </p>
              <p>
                <span className="font-medium">年間予算:</span>{" "}
                {company.annualBudget}
              </p>
            </div>
            <Bar
              options={options}
              data={{
                labels,
                datasets: [
                  {
                    data: company.scores,
                    backgroundColor:
                      index === 0
                        ? "rgba(0, 99, 232, 0.6)"
                        : "rgba(128, 128, 128, 0.6)",
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

async function fetchSecurityData(): Promise<CompanyData[]> {
  return [
    {
      name: "貴社",
      industry: "製造業",
      employeeCount: "約200人",
      averageScore: 3.0,
      annualBudget: "¥80,000",
      scores: [3, 4, 2],
    },
    {
      name: "業界平均",
      industry: "製造業",
      employeeCount: null,
      averageScore: 2.0,
      annualBudget: "¥100,000",
      scores: [3, 1, 2],
    },
    {
      name: "同業他社 1",
      industry: "製造業",
      employeeCount: "約500人",
      averageScore: 2.2,
      annualBudget: "¥120,000",
      scores: [2.5, 2.5, 1.5],
    },
    {
      name: "同業他社 2",
      industry: "製造業",
      employeeCount: "約1000人",
      averageScore: 3.0,
      annualBudget: "¥150,000",
      scores: [4, 3, 2],
    },
  ];
}
