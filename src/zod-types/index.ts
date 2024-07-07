import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum(["id", "role"]);

export const PartScalarFieldEnumSchema = z.enum(["id", "name"]);

export const CategoryScalarFieldEnumSchema = z.enum(["id", "partId", "name"]);

export const QuestionScalarFieldEnumSchema = z.enum([
  "id",
  "partId",
  "categoryId",
  "text",
]);

export const AnswerChoiceScalarFieldEnumSchema = z.enum([
  "id",
  "questionId",
  "text",
  "points",
  "type",
]);

export const AnswerScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "categoryId",
  "answerChoiceId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const UserTypeSchema = z.enum(["MANAGER", "SECURYTY", "ORDINARY"]);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`;

export const AnswerChoiceTypeSchema = z.enum(["RADIO", "CHECKBOX"]);

export type AnswerChoiceTypeType = `${z.infer<typeof AnswerChoiceTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserTypeSchema,
  id: z.string(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// PART SCHEMA
/////////////////////////////////////////

export const PartSchema = z.object({
  id: z.bigint(),
  name: z.string(),
});

export type Part = z.infer<typeof PartSchema>;

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.bigint(),
  partId: z.bigint(),
  name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

/////////////////////////////////////////
// QUESTION SCHEMA
/////////////////////////////////////////

export const QuestionSchema = z.object({
  id: z.bigint(),
  partId: z.bigint(),
  categoryId: z.bigint(),
  text: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;

/////////////////////////////////////////
// ANSWER CHOICE SCHEMA
/////////////////////////////////////////

export const AnswerChoiceSchema = z.object({
  type: AnswerChoiceTypeSchema,
  id: z.bigint(),
  questionId: z.bigint(),
  text: z.string(),
  points: z.number().int(),
});

export type AnswerChoice = z.infer<typeof AnswerChoiceSchema>;

/////////////////////////////////////////
// ANSWER SCHEMA
/////////////////////////////////////////

export const AnswerSchema = z.object({
  id: z.bigint(),
  userId: z.string(),
  categoryId: z.bigint(),
  answerChoiceId: z.bigint(),
});

export type Answer = z.infer<typeof AnswerSchema>;
