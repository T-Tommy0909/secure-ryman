-- CreateEnum
CREATE TYPE "AnswerChoiceType" AS ENUM ('RADIO', 'CHECKBOX');

-- AlterTable
ALTER TABLE "AnswerChoice" ADD COLUMN     "type" "AnswerChoiceType" NOT NULL DEFAULT 'RADIO';
