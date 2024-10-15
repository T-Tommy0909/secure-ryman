import { prisma } from "../src/server/utils/prisma";

export const createLessonSeed = async () => {
  await prisma.lesson.create({
    data: {
      title: "パスワードの重要性と作成・管理方法",
      description:
        "パスワードの重要性を脅威とともに知り、パスワードの適切な作成・管理方法について学ぶことができます",
      fileName: "SecureRyman_パスワードの重要性と作成・管理方法.pdf",
      tags: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });
  await prisma.lesson.create({
    data: {
      title: "安全なメールの取り扱い",
      description: "安全なメールの取り扱い方法を身につけることができます",
      fileName: "SecureRyman_安全なメールの取り扱い.pdf",
      tags: {
        connect: [{ id: 3 }, { id: 2 }],
      },
    },
  });
};
