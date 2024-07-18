import { prisma } from "../src/server/utils/prisma";

export const createUserSeed = async () => {
  await prisma.user.createMany({
    data: [
      {
        id: "auth0|6698f45e56645ec0403c7c6c",
        role: "ORDINARY",
        email: "seedordinary1@example.com",
      },
      {
        id: "auth0|6698f4b056645ec0403c7ca2",
        role: "SECURITY",
        email: "seedsecurity1@example.com",
      },
      {
        id: "auth0|66963d73a15524e673d26a0c",
        role: "MANAGER",
        email: "seedadmin1@example.com",
      },
    ],
    skipDuplicates: true,
  });
};
