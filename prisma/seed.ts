import { create } from "domain";
import { prisma } from "../src/server/utils/prisma";
import { createAnswerChoiceSeed } from "./answerChoice.seed";
import { createCategorySeed } from "./category.seed";
import { createCompanySeed } from "./company.seed";
import { createIndustrySeed } from "./industry.seed";
import { createLessonSeed } from "./lesson.seed";
import { createLessonTagSeed } from "./lesstonTag.seed";
import { createPartSeed } from "./part.seed";
import { createProductSeed } from "./product.seed";
import { createProductCategorySeed } from "./productCategory.seed";
import { createQuestionSeed } from "./question.seed";
import { createUserSeed } from "./user.seed";

const main = async () => {
  await createUserSeed();
  await createPartSeed();
  await createCategorySeed();
  await createQuestionSeed();
  await createAnswerChoiceSeed();
  await createLessonTagSeed();
  await createLessonSeed();
  await createIndustrySeed();
  await createCompanySeed();
  await createProductCategorySeed();
  await createProductSeed();
};

main()
  .then(async () => {
    console.log("Success Seeding!!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
