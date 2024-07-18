import { prisma } from "../src/server/utils/prisma";
import { createAnswerChoiceSeed } from "./answerChoice.seed";
import { createCategorySeed } from "./category.seed";
import { createPartSeed } from "./part.seed";
import { createQuestionSeed } from "./question.seed";
import { createUserSeed } from "./user.seed";

const main = async () => {
  await createUserSeed();
  await createPartSeed();
  await createCategorySeed();
  await createQuestionSeed();
  await createAnswerChoiceSeed();
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
