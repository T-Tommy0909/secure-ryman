import { prisma } from "../src/server/utils/prisma";

export const createQuestionSeed = async () => {
  await prisma.question.createMany({
    data: [
      {
        partId: 1,
        categoryId: 1,
        text: "パソコンやスマホなど情報機器のOSやソフトウェアは常に最新の状態にしていますか",
        target: "ALL",
      },
      {
        partId: 1,
        categoryId: 2,
        text: "パソコンやスマホなどはウイルス対策ソフトを導入し、ウイルス定義ファイルは最新の状態にしていますか",
        target: "ALL",
      },
      {
        partId: 1,
        categoryId: 3,
        text: "重要情報を電子媒体に保管していますか",
        target: "ALL",
      },
      {
        partId: 1,
        categoryId: 4,
        text: "重要情報を保管している電子媒体のパスワードはどのように設定していますか",
        dependentQuestionId: 3,
        target: "ALL",
      },
      {
        partId: 1,
        categoryId: 1,
        text: "顧客に関する重要情報に対する適切なアクセス制限を行っていますか",
        dependentQuestionId: 3,
        target: "ALL",
      },
      {
        partId: 1,
        categoryId: 5,
        text: "新たな脅威や攻撃の手口を知り対策を社内共有する仕組みはできていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 6,
        text: "電子メールの添付ファイルや本文中のURLリンクを介したウイルス感染に気をつけていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 6,
        text: "電子メールやFAXの宛先の送信ミスを防ぐ取り組みを実施していますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 6,
        text: "メールを使用しての個人情報などの重要情報を送信するなどのやり取りを行っていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 6,
        text: "重要情報は電子メール本文に書くのではなく、添付するファイルに書いてパスワードなどで保護していますか",
        target: "ALL",
        dependentQuestionId: 9,
      },
      {
        partId: 2,
        categoryId: 7,
        text: "無線LANを安全に使うために適切な暗号化方式を設定するなどの対策をしていますか",
        target: "MANAGER",
      },
      {
        partId: 2,
        categoryId: 8,
        text: "インターネットを介したウイルス感染やSNSへの書き込みなどのトラブルへの対策をしていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 9,
        text: "顧客の個人情報などをパソコンやサーバに電子媒体として保管していますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 9,
        text: "パソコンやサーバーのウイルス感染、故障や誤操作による重要情報の消失に備えてバックアップを取得していますか",
        target: "ALL",
        dependentQuestionId: 13,
      },
      {
        partId: 2,
        categoryId: 10,
        text: "紛失や盗難を防止するため、重要情報が記載された書類や電子媒体は机上に放置せず、書庫などに安全に保管していますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 11,
        text: "重要情報を会社の外に持ち出すことがありますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 11,
        text: "重要情報が記載された書類や電子媒体を持ち出す時は、盗難や紛失の対策をしていますか",
        target: "ALL",
        dependentQuestionId: 16,
      },
      {
        partId: 2,
        categoryId: 12,
        text: "離席時にパソコン画面の覗き見や勝手な操作ができないようにしていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 12,
        text: "事務所で見知らぬ人を見かけたら声をかけるなど，関係者以外の事務所への立ち入りを制限していますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 12,
        text: "退社時にノートパソコンや備品を施錠保管するなど盗難防止対策をしていますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 12,
        text: "事務所が無人になる時の施錠忘れ対策を実施していますか",
        target: "ALL",
      },
      {
        partId: 2,
        categoryId: 13,
        text: "重要情報が記載された書類や重要なデータが保存された媒体を破棄する時は、復元できないようにしていますか",
        target: "ALL",
      },
      {
        partId: 3,
        categoryId: 14,
        text: "従業員に守秘義務を理解してもらい、業務上知り得た情報を外部に漏らさないなどのルールを守らせていますか",
        target: "MANAGER",
      },
      {
        partId: 3,
        categoryId: 15,
        text: "従業員にセキュリティに関する教育や注意喚起を行なっていますか",
        target: "MANAGER",
      },
      {
        partId: 3,
        categoryId: 16,
        text: "個人所有の情報機器を業務で利用する場合のセキュリティ対策を明確にしていますか",
        target: "ALL",
      },
      {
        partId: 3,
        categoryId: 17,
        text: "重要情報の授受を伴う取引先との契約書には、秘密保持条項を規定していますか",
        target: "ALL",
      },
      {
        partId: 3,
        categoryId: 18,
        text: "クラウドサービスやウェブサイトの運用等で利用する外部サービスは、安全・信頼性を把握して選定していますか",
        target: "ALL",
      },
      {
        partId: 3,
        categoryId: 19,
        text: "セキュリティ事故が発生した場合に備え、緊急時の体制整備や対応手順を作成するなど準備をしていますか",
        target: "ALL",
      },
      {
        partId: 3,
        categoryId: 20,
        text: "情報セキュリティ対策をルール化し、従業員に明示していますか",
        target: "MANAGER",
      },
    ],
    skipDuplicates: true,
  });
};