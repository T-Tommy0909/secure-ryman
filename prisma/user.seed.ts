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
      {
        id: "auth0|66ed6310c1dbd1631d7a764e",
        role: "ORDINARY",
        email: "soichi1@example.com",
      },
      {
        id: "auth0|66ed62eec1dbd1631d7a763c",
        role: "ORDINARY",
        email: "yagi1@example.com",
      },
      {
        id: "auth0|6711a7ab39951d1cd612599f",
        role: "MANAGER",
        email: "seedadmin2@example.com",
      },
      {
        id: "auth0|6711a7c872a64f67bad8536f",
        role: "MANAGER",
        email: "seedadmin3@example.com",
      },
      {
        id: "auth0|6711a7e439951d1cd6125a56",
        role: "MANAGER",
        email: "seedadmin4@example.com",
      },
      {
        id: "auth0|6711a80672a64f67bad8541b",
        role: "MANAGER",
        email: "seedadmin5@example.com",
      },
      {
        id: "auth0|6711ad4639951d1cd61262a9",
        role: "MANAGER",
        email: "seedadmin6@example.com",
      },
      {
        id: "auth0|6711ad6572a64f67bad85bd2",
        role: "MANAGER",
        email: "seedadmin7@example.com",
      },
      {
        id: "auth0|6711ad8839951d1cd61262e1",
        role: "MANAGER",
        email: "seedadmin8@example.com",
      },
      {
        id: "auth0|6711adaf72a64f67bad85c17",
        role: "MANAGER",
        email: "seedadmin9@example.com",
      },
      {
        id: "auth0|6711ade772a64f67bad85c56",
        role: "MANAGER",
        email: "seedadmin10@example.com",
      },
      {
        id: "auth0|6711ae0839951d1cd6126355",
        role: "MANAGER",
        email: "seedadmin11@example.com",
      },
      {
        id: "auth0|6711ae2c72a64f67bad85c92",
        role: "MANAGER",
        email: "seedadmin12@example.com",
      },
      {
        id: "auth0|6711ae7072a64f67bad85cd0",
        role: "MANAGER",
        email: "seedadmin13@example.com",
      },
      {
        id: "auth0|6711ae8d39951d1cd61263c2",
        role: "MANAGER",
        email: "seedadmin14@example.com",
      },
      {
        id: "auth0|6711aebd39951d1cd61263e5",
        role: "MANAGER",
        email: "seedadmin15@example.com",
      },
      {
        id: "auth0|6711aed972a64f67bad85d33",
        role: "MANAGER",
        email: "seedadmin16@example.com",
      },
      {
        id: "auth0|6711af0272a64f67bad85d62",
        role: "MANAGER",
        email: "seedadmin17@example.com",
      },
      {
        id: "auth0|6711af2872a64f67bad85dae",
        role: "MANAGER",
        email: "seedadmin18@example.com",
      },
      {
        id: "auth0|6711af4d39951d1cd6126497",
        role: "MANAGER",
        email: "seedadmin19@example.com",
      },
      {
        id: "auth0|6711af6e39951d1cd61264b5",
        role: "MANAGER",
        email: "seedadmin20@example.com",
      },
    ],
    skipDuplicates: true,
  });
};
