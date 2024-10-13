-- CreateTable
CREATE TABLE "Quiz" (
    "id" BIGSERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "lessonId" BIGINT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" BIGSERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "quizId" BIGINT NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuizAnswerToUser" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuizAnswerToUser_AB_unique" ON "_QuizAnswerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizAnswerToUser_B_index" ON "_QuizAnswerToUser"("B");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizAnswerToUser" ADD CONSTRAINT "_QuizAnswerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "QuizAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizAnswerToUser" ADD CONSTRAINT "_QuizAnswerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
