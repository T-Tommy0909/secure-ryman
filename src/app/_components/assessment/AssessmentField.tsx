"use client";

import React, { FC, useMemo, useState } from "react";
import { clientApi } from "@/app/_trpc/client-api";
import { CreateAnswersRequestPayload } from "@/types/answer";
import { motion, AnimatePresence } from "framer-motion";

interface AnswerChoice {
  id: string;
  questionId: string;
  text: string;
  points: number;
  type: "RADIO" | "CHECKBOX";
}

interface Question {
  id: string;
  partId: string;
  categoryId: string;
  text: string;
  answerChoices: AnswerChoice[];
  dependentQuestions?: Question[];
}

interface Part {
  id: string;
  name: string;
  questions: Question[];
}

interface Props {
  partsWithCategoriesAndQuestions: Part[];
}

export const AssessmentField: FC<Props> = ({
  partsWithCategoriesAndQuestions,
}) => {
  const mutation = clientApi.answers.createMany.useMutation();
  const createAnswers = (input: CreateAnswersRequestPayload) => {
    mutation.mutate(input);
  };

  const [answers, setAnswers] = useState<
    {
      userId: string;
      categoryId: string;
      questionId: string;
      answerChoiceId: string;
    }[]
  >([]);

  const [visibleQuestions, setVisibleQuestions] = useState<Set<string>>(
    new Set(
      partsWithCategoriesAndQuestions.flatMap((part) =>
        part.questions.map((q) => q.id),
      ),
    ),
  );

  const handleAnswerChange = (
    categoryId: string,
    questionId: string,
    answerChoiceId: string,
    type: "RADIO" | "CHECKBOX",
    question: Question,
  ) => {
    setAnswers((prevAnswers) => {
      let updatedAnswers: {
        userId: string;
        categoryId: string;
        questionId: string;
        answerChoiceId: string;
      }[];

      if (type === "RADIO") {
        updatedAnswers = prevAnswers.filter(
          (answer) => answer.questionId !== questionId,
        );
        updatedAnswers.push({
          userId: "1",
          categoryId: categoryId,
          questionId: questionId,
          answerChoiceId: answerChoiceId,
        });

        // Handle visibility of dependent questions
        setVisibleQuestions((prev) => {
          const newSet = new Set(prev);
          const selectedChoice = question.answerChoices.find(
            (choice) => choice.id === answerChoiceId,
          );

          if (
            selectedChoice?.text.toLowerCase() === "はい" &&
            question.dependentQuestions
          ) {
            question.dependentQuestions.forEach((q) => newSet.add(q.id));
          } else if (question.dependentQuestions) {
            question.dependentQuestions.forEach((q) => {
              newSet.delete(q.id);
              // Also remove answers for hidden questions
              updatedAnswers = updatedAnswers.filter(
                (answer) => answer.questionId !== q.id,
              );
            });
          }
          return newSet;
        });
      } else {
        const existingAnswer = prevAnswers.find(
          (answer) =>
            answer.questionId === questionId &&
            answer.answerChoiceId === answerChoiceId,
        );
        if (existingAnswer) {
          updatedAnswers = prevAnswers.filter(
            (answer) =>
              !(
                answer.questionId === questionId &&
                answer.answerChoiceId === answerChoiceId
              ),
          );
        } else {
          updatedAnswers = [
            ...prevAnswers,
            {
              userId: "1",
              categoryId: categoryId,
              questionId: questionId,
              answerChoiceId: answerChoiceId,
            },
          ];
        }
      }
      return updatedAnswers;
    });
  };

  const isAllQuestionsAnswered = useMemo(() => {
    const visibleQuestionIds = Array.from(visibleQuestions);
    return visibleQuestionIds.every((qId) =>
      answers.some((answer) => answer.questionId === qId),
    );
  }, [visibleQuestions, answers]);

  const renderQuestion = (
    question: Question,
    parentNumber: string = "",
    depth: number = 0,
  ) => {
    const isVisible = visibleQuestions.has(question.id);

    const questionNumber = parentNumber
      ? `${parentNumber}-${depth + 1}`
      : `${depth + 1}`;

    return (
      <AnimatePresence key={question.id}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-8`}
          >
            <p className="mb-4 font-medium text-gray-700">
              {questionNumber}. {question.text}
            </p>
            <div className="space-y-3">
              {question.answerChoices.map((choice) => {
                const isSelected = answers.some(
                  (answer) => answer.answerChoiceId === choice.id,
                );
                return (
                  <label
                    key={choice.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type={choice.type.toLowerCase()}
                      name={`q${question.id}`}
                      value={choice.text}
                      checked={isSelected}
                      onChange={() =>
                        handleAnswerChange(
                          question.categoryId,
                          question.id,
                          choice.id,
                          choice.type,
                          question,
                        )
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 mr-3 flex items-center justify-center ${
                        choice.type === "RADIO" ? "rounded-full" : "rounded"
                      } ${
                        isSelected ? "bg-blue-600" : "border-2 border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className={
                            choice.type === "RADIO"
                              ? "w-2 h-2 rounded-full bg-white"
                              : "w-3 h-2 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-y-[-1px]"
                          }
                        />
                      )}
                    </div>
                    <span className="text-gray-700">{choice.text}</span>
                  </label>
                );
              })}
            </div>
            {question.dependentQuestions &&
              question.dependentQuestions.map((depQuestion, depIndex) =>
                renderQuestion(depQuestion, questionNumber, depIndex),
              )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          5分でできるセキュリティ診断
        </h1>
        <p className="text-gray-600 mt-2">
          診断内容を読み、解答欄から該当するものを選択してください。
        </p>
      </div>
      {partsWithCategoriesAndQuestions.map((part) => (
        <div key={part.id} className="p-6">
          <div className="bg-blue-50 p-3 mb-6 font-semibold text-blue-800 rounded-md">
            {part.name}
          </div>
          {part.questions.map((question, index) =>
            renderQuestion(question, "", index),
          )}
        </div>
      ))}
      <div className="bg-gray-100 p-4 border-t border-gray-200 flex justify-end">
        <button
          className="bg-blue-600 text-white py-2 px-4 text-sm rounded cursor-pointer hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            const filteredAnswers = answers
              .filter((answer) => visibleQuestions.has(answer.questionId))
              .map((answer) => ({
                answerChoiceId: answer.answerChoiceId,
                categoryId: answer.categoryId,
                userId: answer.userId,
              }));
            createAnswers(filteredAnswers);
          }}
          disabled={!isAllQuestionsAnswered}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default AssessmentField;
