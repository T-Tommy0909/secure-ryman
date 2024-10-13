import * as z from "zod";

export const CreateQuizAnswersRequestSchema = z.object({
  userId: z.string(),
  userAnswers: z.array(
    z.object({
      quizId: z.string(),
      quizAnswerId: z.string(),
    }),
  ),
});
export type CreateQuizAnswersRequestPayload = z.infer<
  typeof CreateQuizAnswersRequestSchema
>;
