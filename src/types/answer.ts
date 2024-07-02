import { AnswerSchema } from "@/zod-types";
import * as z from "zod";

export const CreateAnswersRequestSchema = z.array(
  z.intersection(
    AnswerSchema.pick({
      userId: true,
    }),
    z.object({
      categoryId: z.string(),
      answerChoiceId: z.string(),
    }),
  ),
);
export type CreateAnswersRequestPayload = z.infer<
  typeof CreateAnswersRequestSchema
>;
