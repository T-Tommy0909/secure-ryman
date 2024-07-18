import { prisma } from "../src/server/utils/prisma";

export const createAnswerChoiceSeed = async () => {
  await prisma.answerChoice.createMany({
    data: [
      {
        questionId: 1,
        text: "個人所有 or 社内 すべてのパソコン，スマホのOSやソフトウェアなどが最新の状態である",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 1,
        text: "個人所有 or 社内 で使用する機器の内，どれか1つでもOSやソフトウェアが最新の状態である",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 1,
        text: "個人所有 or 社内 全てのパソコン，スマホのOSやソフトウェアが最新の状態ではない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 1, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 2,
        text: "個人所有 or 社内 すべてのパソコン，スマホにウイルス対策ソフトを導入し，最新のバージョンである",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 2,
        text: "個人所有 or 社内 一部のパソコン，スマホにウイルス対策ソフトが導入されている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 2,
        text: "個人所有 or 社内 全てのパソコン，スマホにウイルス対策ソフトが導入されていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 2, text: "わからない", points: -1, type: "RADIO" },

      { questionId: 3, text: "はい", points: 0, type: "RADIO" },
      { questionId: 3, text: "いいえ", points: 4, type: "RADIO" },

      {
        questionId: 4,
        text: "パスワードは10文字以上で構成している",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "パスワードに名前・地名・生年月日などを使用していない",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "パスワードの使いまわしをしていない",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "パスワードは他者が見えないような場所に記載していない",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "パスワードはアルファベットの大文字小文字・数字や記号などを組み合わせている",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "「aaa」など同じ文字を連ねたパスワードを使用していない",
        points: 0.5,
        type: "CHECKBOX",
      },
      {
        questionId: 4,
        text: "上記の対策を一切行っていない",
        points: -1,
        type: "CHECKBOX",
      },

      {
        questionId: 5,
        text: "重要情報にアクセス制限をかけている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 5,
        text: "重要情報にアクセス制限を一部かけている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 5,
        text: "重要情報にアクセス制限をかけていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 5, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 6,
        text: "ニュースやインターネット記事などからサイバー攻撃の新たな手法を知り，社内共有している（社内で共有されている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 6,
        text: "セキュリティに関する注意を非定期的に行っている（行われている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 6,
        text: "実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 6, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 7,
        text: "信頼できない電子メールの添付ファイルやＵＲＬリンクを安易に開かない意識がある",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 7,
        text: "添付ファイル，もしくはＵＲＬリンクのどちらか一方には気をつけている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 7,
        text: "電子メールやＵＲＬリンクに潜むリスクを容認した上で気をつけていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 7, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 8,
        text: "電子メールを送信する際に，「社員が上司に再度確認をとる」，「最終チェックを行う」などの具体的な対策が実施されている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 8,
        text: "具体的な対策はないが，送信ミスを防ぐよう周知されている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 8,
        text: "実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 8, text: "わからない", points: -1, type: "RADIO" },

      { questionId: 9, text: "はい", points: 0, type: "RADIO" },
      { questionId: 9, text: "いいえ", points: 4, type: "RADIO" },

      {
        questionId: 10,
        text: "質問内容に記された対策が完全に実施されている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 10,
        text: "重要情報は本文ではなく添付ファイルに書いているが，パスワードは設定していない",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 10,
        text: "重要情報は電子メールの本文に書いている",
        points: 0,
        type: "RADIO",
      },
      { questionId: 10, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 11,
        text: "暗号化方式が適切に設定されている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 11,
        text: "暗号化はしているが，WEPなどの脆弱性が高い暗号化方式である",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 11,
        text: "暗号化をしていない，オープンネットワークを使用している",
        points: 0,
        type: "RADIO",
      },
      { questionId: 11, text: "わからない", points: -1, type: "RADIO" },
      {
        questionId: 12,
        text: "従業員に対して，「社内のパソコンで危険なウェブページを開かないようにさせる」，「SNS上でのトラブルを起こさせないように注意喚起をする」など具体的な対策をしている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 12,
        text: "ウイルス感染もしくはSNSへの書き込みなどによるトラブルに関して一部対策を実施している",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 12,
        text: "具体的な対策はない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 12, text: "わからない", points: -1, type: "RADIO" },

      { questionId: 13, text: "はい", points: 0, type: "RADIO" },
      { questionId: 13, text: "いいえ", points: 4, type: "RADIO" },

      {
        questionId: 14,
        text: "バックアップを定期的に取っている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 14,
        text: "一部バックアップを取っていない",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 14,
        text: "バックアップを取っていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 14, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 15,
        text: "鍵のかけられる引き出し，棚などに重要情報を記載した媒体を保管している（もしくは，そのような仕組みが社内で設けられている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 15,
        text: "質問内容に記載された対策に関して一部実施している（実施されている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 15,
        text: "特に対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 15, text: "わからない", points: -1, type: "RADIO" },

      { questionId: 16, text: "はい", points: 0, type: "RADIO" },
      { questionId: 16, text: "いいえ", points: 4, type: "RADIO" },
      {
        questionId: 17,
        text: "ノートパソコンやスマートフォンを社外に持ち出す際に，パスワードの入力を求めるように設定し，データファイルの暗号化などを行っている（もしくは，そのような仕組みが社内で設けられている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 17,
        text: "一部盗難や紛失の対策を実施している（実施されている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 17,
        text: "特に対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 17, text: "わからない", points: -1, type: "RADIO" },
      {
        questionId: 18,
        text: "離席時に，ロック状態にするなど具体的な対策をしている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 18,
        text: "一部の従業員には実施している，もしくは一部のパソコンはロックをかけるようにしている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 18,
        text: "特に対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 18, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 19,
        text: "受付を設置している（受付が設置されている），事務所の出入り口を施錠している（施錠されている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 19,
        text: "重要情報の保管場所は立ち入りを制限している（制限されている）が，その他の場所は特に制限していない（制限されていない）",
        points: 2,
        type: "RADIO",
      },
      { questionId: 19, text: "出入りは自由である", points: 0, type: "RADIO" },
      { questionId: 19, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 20,
        text: "ノートパソコンやUSBなど手軽に持ち運べる端末や備品を施錠可能な引出しに保管するなどの対策を実施している（対策が実施されている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 20,
        text: "一部媒体に関しては実施している（実施されている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 20,
        text: "特に具体的な対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 20, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 21,
        text: "鍵の管理を徹底し，最終退出者は事務所を施錠し，退出の記録を残している（もしくは，そのような仕組みが社内で設けられている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 21,
        text: "一部対策に関しては実施している（実施されている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 21,
        text: "特に具体的な対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 21, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 22,
        text: "書類はシュレッダーにかける，電子データは消去ソフトを利用する，物理的に破壊するなどの適切な処分をしている（もしくは，そのような仕組みが社内で設けられている）",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 22,
        text: "一部の書類や電子データ，重要情報に関しては実施している（実施されている）",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 22,
        text: "特に具体的な対策は実施していない（実施されていない）",
        points: 0,
        type: "RADIO",
      },
      { questionId: 22, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 23,
        text: "「従業員採用時に守秘義務について説明をする」，「守秘に関する覚書を交わす」，「秘密にしている情報を具体的に，明確に説明している」",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 23,
        text: "守秘義務や機密保持については規則で定めているが，どのような情報が秘密なのか明確な説明はしていない",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 23,
        text: "特に具体的な対策は実施していない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 23, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 24,
        text: "「情報管理の大切さや関連する法令を従業員に説明する」，「定期的な研修の機会を設けている」",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 24,
        text: "定期的な研修などは設けていないが，口頭で注意喚起を行っている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 24,
        text: "注意喚起は特に実施していない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 24, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 25,
        text: "パソコンやタブレット，外付けHDDなど，それぞれの電子機器に対して，業務で使用する個人所有および社内機器のどちらにおいても順守事項を定めている",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 25,
        text: "一部の電子機器の順守事項が明確化されている",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 25,
        text: "電子機器の使用に関して，特に取り決めはない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 25, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 26,
        text: "利用規約や保証内容，セキュリティへの対策などを確認して事業者を選定している",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 26,
        text: "ネットの情報のみで判断している，利用規約や保証内容を自身で確認して安全・信頼性を把握しているわけではない",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 26,
        text: "安全性などは特に確認せず，クラウドサービスやウェブサイトを利用している",
        points: 0,
        type: "RADIO",
      },
      { questionId: 26, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 27,
        text: "「機密保持や具体的な対策を明記した契約や覚書を交わしている」，「情報セキュリティ対応方針を公表している取引先を選定している」，「取引先の情報セキュリティへの対策を確認している」",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 27,
        text: "上記の対策について一部実施している",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 27,
        text: "取引先との契約は特に交わしていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 27, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 28,
        text: "重要情報の流失や紛失，盗難があった場合の対応手順書を作成し，従業員に周知している",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 28,
        text: "一部の重要情報や対策に関して準備は実施している",
        points: 2,
        type: "RADIO",
      },
      {
        questionId: 28,
        text: "緊急時の体制整備などは全く考えていない",
        points: 0,
        type: "RADIO",
      },
      { questionId: 28, text: "わからない", points: -1, type: "RADIO" },

      {
        questionId: 29,
        text: "ルールを明確化し，従業員に共有している",
        points: 4,
        type: "RADIO",
      },
      {
        questionId: 29,
        text: "一部のルールに関しては実施している",
        points: 2,
        type: "RADIO",
      },
      { questionId: 29, text: "特に実施していない", points: 0, type: "RADIO" },
      { questionId: 29, text: "わからない", points: -1, type: "RADIO" },
    ],
    skipDuplicates: true,
  });
};
