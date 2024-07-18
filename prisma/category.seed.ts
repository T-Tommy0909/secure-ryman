import { prisma } from "../src/server/utils/prisma";

export const createCategorySeed = async () => {
  await prisma.category.createMany({
    data: [
      { name: "脆弱性対策", partId: 1 },
      { name: "ウイルス対策", partId: 1 },
      { name: "パスワード管理", partId: 1 },
      { name: "機器の設定", partId: 1 },
      { name: "情報収集", partId: 1 },
      { name: "電子メールのルール", partId: 2 },
      { name: "無線LANのルール", partId: 2 },
      { name: "インターネット利用のルール", partId: 2 },
      { name: "バックアップのルール", partId: 2 },
      { name: "保管のルール", partId: 2 },
      { name: "持ち出しのルール", partId: 2 },
      { name: "事務所の安全管理", partId: 2 },
      { name: "情報の安全な処分", partId: 2 },
      { name: "守秘義務の周知", partId: 3 },
      { name: "従業員教育", partId: 3 },
      { name: "私物機器の利用", partId: 3 },
      { name: "取引先管理", partId: 3 },
      { name: "外部サービスの利用", partId: 3 },
      { name: "事故への備え", partId: 3 },
      { name: "ルールの整備", partId: 3 },
    ],
    skipDuplicates: true,
  });
};
