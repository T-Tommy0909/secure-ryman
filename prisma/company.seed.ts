import { prisma } from "../src/server/utils/prisma";

export const createCompanySeed = async () => {
  await prisma.company.create({
    data: {
      employee: 500,
      budget: 30,
      industryId: 1,
      users: {
        connect: [
          { id: "auth0|6698f45e56645ec0403c7c6c" },
          { id: "auth0|6698f4b056645ec0403c7ca2" },
          { id: "auth0|66963d73a15524e673d26a0c" },
        ],
      },
    },
  });
  await prisma.company.create({
    data: {
      employee: 500,
      budget: 30,
      industryId: 1,
      users: {
        connect: [{ id: "auth0|66ed6310c1dbd1631d7a764e" }],
      },
    },
  });
  await prisma.company.create({
    data: {
      employee: 1000,
      budget: 10,
      industryId: 2,
      users: {
        connect: [{ id: "auth0|66ed62eec1dbd1631d7a763c" }],
      },
    },
  });
};
