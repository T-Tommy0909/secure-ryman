-- CreateTable
CREATE TABLE "Lesson" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonTag" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LessonTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LessonToUser" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LessonToLessonTag" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToUser_AB_unique" ON "_LessonToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonToUser_B_index" ON "_LessonToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToLessonTag_AB_unique" ON "_LessonToLessonTag"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonToLessonTag_B_index" ON "_LessonToLessonTag"("B");

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD CONSTRAINT "_LessonToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD CONSTRAINT "_LessonToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToLessonTag" ADD CONSTRAINT "_LessonToLessonTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToLessonTag" ADD CONSTRAINT "_LessonToLessonTag_B_fkey" FOREIGN KEY ("B") REFERENCES "LessonTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
