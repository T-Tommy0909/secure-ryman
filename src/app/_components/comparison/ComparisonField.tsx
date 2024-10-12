"use client";

import { FC } from "react";
import {
  CompetitorIndustryResultList,
  MyCompanyResult,
  MyIndustryResult,
} from "@/server/routers/company";
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

interface SecurityComparisonProps {
  myCompanyResult: MyCompanyResult;
  myIndustryResult: MyIndustryResult;
  competitorIndustryResultList: CompetitorIndustryResultList;
}

const SecurityComparison: FC<SecurityComparisonProps> = ({
  myCompanyResult,
  myIndustryResult,
  competitorIndustryResultList,
}) => {
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">貴社</h2>
          <div className="mb-4">
            <p>
              <span className="font-medium">業界:</span>{" "}
              {myCompanyResult.industry}
            </p>
            {myCompanyResult.employee && (
              <p>
                <span className="font-medium">社員数:</span> 約
                {myCompanyResult.employee}人
              </p>
            )}
            <p>
              <span className="font-medium">平均点:</span>{" "}
              {myCompanyResult.averageScore}
            </p>
            <p>
              <span className="font-medium">年間予算:</span> 約
              {myCompanyResult.budget}万円
            </p>
          </div>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  data: myCompanyResult.partScoreAverages,
                  backgroundColor: "rgba(0, 99, 232, 0.6)",
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">業界平均</h2>
          <div className="mb-4">
            <p>
              <span className="font-medium">業界:</span>{" "}
              {myIndustryResult.industry}
            </p>
            <p>
              <span className="font-medium">平均点:</span>{" "}
              {myIndustryResult.averageScore}
            </p>
            <p>
              <span className="font-medium">年間予算:</span> 約
              {myIndustryResult.budget}万円
            </p>
          </div>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  data: myIndustryResult.partScoreAverages,
                  backgroundColor: "rgba(128, 128, 128, 0.6)",
                },
              ],
            }}
          />
        </div>
        {competitorIndustryResultList.map((company, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">同業他社-{index + 1}</h2>
            <div className="mb-4">
              <p>
                <span className="font-medium">業界:</span> {company.industry}
              </p>
              {company.employee && (
                <p>
                  <span className="font-medium">社員数:</span> 約
                  {company.employee}人
                </p>
              )}
              <p>
                <span className="font-medium">平均点:</span>{" "}
                {company.averageScore}
              </p>
              <p>
                <span className="font-medium">年間予算:</span> 約
                {company.budget}万円
              </p>
            </div>
            <Bar
              options={options}
              data={{
                labels,
                datasets: [
                  {
                    data: company.partScoreAverages,
                    backgroundColor: "rgba(128, 128, 128, 0.6)",
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityComparison;
