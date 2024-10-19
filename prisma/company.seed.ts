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
          { id: "auth0|6711af6e39951d1cd61264b5" },
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
        connect: [
          { id: "auth0|66ed6310c1dbd1631d7a764e" },
          { id: "auth0|6711a7ab39951d1cd612599f" },
          { id: "auth0|6711a7c872a64f67bad8536f" },
          { id: "auth0|6711a7e439951d1cd6125a56" },
          { id: "auth0|6711a80672a64f67bad8541b" },
          { id: "auth0|6711ad4639951d1cd61262a9" },
          { id: "auth0|6711ad6572a64f67bad85bd2" },
          { id: "auth0|6711ad8839951d1cd61262e1" },
          { id: "auth0|6711adaf72a64f67bad85c17" },
          { id: "auth0|6711ade772a64f67bad85c56" },
          { id: "auth0|6711ae0839951d1cd6126355" },
          { id: "auth0|6711ae2c72a64f67bad85c92" },
          { id: "auth0|6711ae7072a64f67bad85cd0" },
          { id: "auth0|6711ae8d39951d1cd61263c2" },
          { id: "auth0|6711aebd39951d1cd61263e5" },
          { id: "auth0|6711aed972a64f67bad85d33" },
          { id: "auth0|6711af0272a64f67bad85d62" },
          { id: "auth0|6711af2872a64f67bad85dae" },
        ],
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
