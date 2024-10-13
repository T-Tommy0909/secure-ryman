"use client";

import { FC } from "react";
import { Button } from "@/app/_components/ui/button";
import { clientApi } from "@/app/_trpc/client-api";
import Link from "next/link";

interface Props {
  userId: string;
  lessonId: string;
}

export const QuizResultField: FC<Props> = ({ userId, lessonId }) => {
  //serverで取得すると、再回答時に前回のデータが引き継がれてしまうため
  const { data: myAnswers } = clientApi.quizzes.myAnswers.useQuery({
    lessonId: lessonId,
    userId: userId,
  });

  // 正解数をカウント
  const correctAnswersCount =
    myAnswers &&
    myAnswers.filter((myAnswer) => myAnswer.userAnswer.isCorrect === true)
      .length;

  return (
    myAnswers && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">結果</h1>
          <p className="text-xl mb-4 text-center">
            正解数: {correctAnswersCount} / {myAnswers.length}
          </p>
          {myAnswers.map((myAnswer, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">{myAnswer.quizText}</p>
              <p
                className={
                  myAnswer.userAnswer.isCorrect === true
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                あなたの回答: {myAnswer.userAnswer.text}
              </p>
              <p className="text-green-600">正解: {myAnswer.quizAnswer}</p>
            </div>
          ))}
          <div className="flex justify-center mt-6 space-x-4">
            <Button variant="custom">
              <Link href={`/e-learning/${lessonId}/quiz`}>再回答</Link>
            </Button>
            <Button variant="custom">
              <Link href="/e-learning">終了</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
