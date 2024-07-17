-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('ALL', 'MANAGER', 'ORDINARY');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "target" "TargetType" NOT NULL DEFAULT 'ALL';
