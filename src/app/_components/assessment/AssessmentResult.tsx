"use client";

import React, { FC } from "react";
import { clientApi } from "@/app/_trpc/client-api";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const shortenLabel = (str: string, maxWidth: number) => {
  return str.length > maxWidth ? str.slice(0, maxWidth - 3) + "..." : str;
};

export const AssessmentResultField: FC = () => {
  const { user } = useUser();
  if (!user || !user.sub) {
    throw new Error("User id not found");
  }

  const {
    data: myResult,
    isLoading: myResultFetchIsLoading,
    error: myResultFetchError,
  } = clientApi.answers.myAnswerList.useQuery({
    userId: user.sub,
  });

  if (myResultFetchError) {
    throw new Error(myResultFetchError.message);
  }
  if (myResultFetchIsLoading) {
    return <div>Loading...</div>;
  }

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 4,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const originalLabel = context.chart.data.labels[context.dataIndex];
            return `${originalLabel}: ${context.formattedValue}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };
  const createChartData = (
    categories: { categoryName: string; points: number }[],
  ) => ({
    labels: categories.map((cat) => shortenLabel(cat.categoryName, 10)),
    datasets: [
      {
        data: categories.map((cat) => cat.points),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  });

  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">あなたの診断結果</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myResult &&
          myResult.map((part, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {part.partName}
              </h2>
              <div className="w-full h-64 mb-4">
                <Radar
                  data={createChartData(part.category)}
                  options={chartOptions}
                />
              </div>
              {part.category.filter((cat) => cat.points < 2).length > 0 ? (
                <>
                  <p className="mt-4 text-sm">
                    以下の項目は基準値を下回る点数となりました。
                    <br />
                    {part.category
                      .filter((cat) => cat.points < 2)
                      .map((cat, i) => (
                        <span key={i}>
                          {cat.categoryName}
                          {i !==
                            part.category.filter((cat) => cat.points < 2)
                              .length -
                              1 && "、"}
                        </span>
                      ))}
                  </p>
                  {(() => {
                    const recommendLinks = part.category.flatMap((cat) =>
                      cat.recommendLesson ? (
                        <a
                          key={cat.recommendLesson.id}
                          href={`/e-learning/${cat.recommendLesson.id}`}
                          className="text-blue-500 underline"
                        >
                          {cat.recommendLesson.title}
                        </a>
                      ) : (
                        []
                      ),
                    );

                    return recommendLinks.length > 0 ? (
                      <p className="mt-2 text-sm">
                        {recommendLinks}で確認しましょう。
                      </p>
                    ) : null;
                  })()}
                </>
              ) : (
                <p className="mt-4 text-sm">
                  全ての項目が基準値以上の点数となっています。
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
