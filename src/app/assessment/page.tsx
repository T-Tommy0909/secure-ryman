import { NextPage } from "next";
import React from "react";
import { AssessmentField } from "../_components/assessment/AssessmentField";
import { serverApi } from "../_trpc/server-api";

interface Question {
  id: string;
  partId: string;
  categoryId: string;
  text: string;
  dependentQuestionId: string | null;
  answerChoices: AnswerChoice[];
  dependentQuestions?: Question[];
}

interface AnswerChoice {
  id: string;
  questionId: string;
  text: string;
  points: number;
  type: "RADIO" | "CHECKBOX";
}

const Assessment: NextPage = async () => {
  const parts = (await serverApi.parts.list()).map((part) => {
    return { ...part, id: String(part.id) };
  });

  const questions = (await serverApi.questions.list()).map((question) => {
    return {
      ...question,
      id: String(question.id),
      partId: String(question.partId),
      categoryId: String(question.categoryId),
      dependentQuestionId: question.dependentQuestionId
        ? String(question.dependentQuestionId)
        : null,
      answerChoices: question.answerChoices.map((answerChoice) => {
        return {
          ...answerChoice,
          id: String(answerChoice.id),
          questionId: String(answerChoice.questionId),
        };
      }),
    };
  });

  const addDependentQuestions = (question: Question) => {
    const dependentQuestions = questions.filter(
      (q) => q.dependentQuestionId === question.id,
    );
    if (dependentQuestions.length > 0) {
      question.dependentQuestions = dependentQuestions.map(
        addDependentQuestions,
      );
    }
    return question;
  };

  const topLevelQuestions = questions.filter((q) => !q.dependentQuestionId);

  const partsWithCategoriesAndQuestions = parts.map((part) => {
    const partQuestions = topLevelQuestions
      .filter((question) => question.partId === part.id)
      .map(addDependentQuestions);
    return { ...part, questions: partQuestions };
  });

  return (
    <AssessmentField
      partsWithCategoriesAndQuestions={partsWithCategoriesAndQuestions}
    />
  );
};

export default Assessment;
