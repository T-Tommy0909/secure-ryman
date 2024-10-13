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

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "companyId",
  "role",
]);

export const PartScalarFieldEnumSchema = z.enum(["id", "name"]);

export const CategoryScalarFieldEnumSchema = z.enum(["id", "partId", "name"]);

export const QuestionScalarFieldEnumSchema = z.enum([
  "id",
  "partId",
  "categoryId",
  "text",
  "dependentQuestionId",
  "target",
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

export const LessonScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "description",
  "fileName",
]);

export const LessonTagScalarFieldEnumSchema = z.enum(["id", "name"]);

export const CompanyScalarFieldEnumSchema = z.enum([
  "id",
  "employee",
  "budget",
  "industryId",
]);

export const ProductScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "description",
  "price",
  "usagePeriod",
  "companyId",
]);

export const IndustryScalarFieldEnumSchema = z.enum(["id", "name"]);

export const ProductCategoryScalarFieldEnumSchema = z.enum(["id", "name"]);

export const QuizScalarFieldEnumSchema = z.enum(["id", "text", "lessonId"]);

export const QuizAnswerScalarFieldEnumSchema = z.enum([
  "id",
  "text",
  "isCorrect",
  "quizId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const UserTypeSchema = z.enum(["MANAGER", "SECURITY", "ORDINARY"]);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`;

export const TargetTypeSchema = z.enum(["ALL", "MANAGER", "ORDINARY"]);

export type TargetTypeType = `${z.infer<typeof TargetTypeSchema>}`;

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
  email: z.string(),
  companyId: z.bigint().nullable(),
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
  target: TargetTypeSchema,
  id: z.bigint(),
  partId: z.bigint(),
  categoryId: z.bigint(),
  text: z.string(),
  dependentQuestionId: z.bigint().nullable(),
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

/////////////////////////////////////////
// LESSON SCHEMA
/////////////////////////////////////////

export const LessonSchema = z.object({
  id: z.bigint(),
  title: z.string(),
  description: z.string(),
  fileName: z.string(),
});

export type Lesson = z.infer<typeof LessonSchema>;

/////////////////////////////////////////
// LESSON TAG SCHEMA
/////////////////////////////////////////

export const LessonTagSchema = z.object({
  id: z.bigint(),
  name: z.string(),
});

export type LessonTag = z.infer<typeof LessonTagSchema>;

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.bigint(),
  employee: z.number().int().nullable(),
  budget: z.number().int().nullable(),
  industryId: z.bigint().nullable(),
});

export type Company = z.infer<typeof CompanySchema>;

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.string().nullable(),
  usagePeriod: z.string().nullable(),
  companyId: z.bigint(),
});

export type Product = z.infer<typeof ProductSchema>;

/////////////////////////////////////////
// INDUSTRY SCHEMA
/////////////////////////////////////////

export const IndustrySchema = z.object({
  id: z.bigint(),
  name: z.string(),
});

export type Industry = z.infer<typeof IndustrySchema>;

/////////////////////////////////////////
// PRODUCT CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductCategorySchema = z.object({
  id: z.bigint(),
  name: z.string(),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

/////////////////////////////////////////
// QUIZ SCHEMA
/////////////////////////////////////////

export const QuizSchema = z.object({
  id: z.bigint(),
  text: z.string(),
  lessonId: z.bigint(),
});

export type Quiz = z.infer<typeof QuizSchema>;

/////////////////////////////////////////
// QUIZ ANSWER SCHEMA
/////////////////////////////////////////

export const QuizAnswerSchema = z.object({
  id: z.bigint(),
  text: z.string(),
  isCorrect: z.boolean(),
  quizId: z.bigint(),
});

export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
