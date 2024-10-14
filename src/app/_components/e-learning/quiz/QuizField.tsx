"use client";

import { FC, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { clientApi } from "@/app/_trpc/client-api";
import { QuizList } from "@/server/routers/quiz";
import { CreateQuizAnswersRequestPayload } from "@/types/quizAnswer";
import { useRouter } from "next/navigation";

interface Props {
  quizList: QuizList;
  userId: string;
  lessonId: string;
}

interface SelectedAnswers {
  quizId: string;
  quizAnswerId: string;
}

export const QuizField: FC<Props> = ({ quizList, userId, lessonId }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const [quizId, quizAnswerId] = answer.split(",");
    const newAnswers = [...selectedAnswers];
    const index = newAnswers.findIndex((answer) => answer.quizId === quizId);
    if (index === -1) {
      newAnswers.push({
        quizId: quizId,
        quizAnswerId: quizAnswerId,
      });
    } else {
      newAnswers[index] = {
        quizId: quizId,
        quizAnswerId: quizAnswerId,
      };
    }

    setSelectedAnswers(newAnswers);
  };

  const mutation = clientApi.quizAnswers.createMany.useMutation();
  const handleSubmit = () => {
    const answers: CreateQuizAnswersRequestPayload = {
      userId: userId,
      userAnswers: selectedAnswers.map((answer) => ({
        quizId: answer.quizId,
        quizAnswerId: answer.quizAnswerId,
      })),
    };
    mutation.mutate(answers);
    router.push(`/e-learning/${lessonId}/quiz/result`);
  };

  return (
    <div>
      {quizList.map((quiz, index) => (
        <div key={index} className="mb-6">
          <p className="text-xl mb-4">{quiz.text}</p>
          <RadioGroup onValueChange={handleAnswer}>
            {quiz.quizAnswer.map((choice, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={`${quiz.id},${String(choice.id)}`} />
                <Label>{choice.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button onClick={handleSubmit} className="w-full mt-4" variant="custom">
        採点
      </Button>
    </div>
  );
};
