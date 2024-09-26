import { NextPage } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { ClipboardList, BookOpen, LogIn, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "./_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./_components/ui/card";
import { serverApi } from "./_trpc/server-api";

const HomePage: NextPage = async () => {
  const sesstion = await getSession();
  const isMyAnswer = sesstion
    ? await serverApi.answers.checkAnswerExistence({
        userId: sesstion.user.sub,
      })
    : null;
  const myAnswer =
    sesstion && isMyAnswer
      ? await serverApi.answers.myAnswerList({
          userId: sesstion.user.sub,
        })
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
      <img
        src="/secure-ryman-logo.svg"
        alt="Secure Ryman Logo"
        className="h-12 w-12 mr-4"
      />
      <h1 className="text-gray-800 text-3xl font-bold">
        Secure Rymanへようこそ
      </h1>
      </div>

      {!sesstion ? (
      <Card>
        <CardHeader>
        <CardTitle>ログインしてセキュリティ診断を始めましょう</CardTitle>
        </CardHeader>
        <CardFooter>
        <Link href="/api/auth/login">
          <Button variant="custom">
          <LogIn className="mr-2 h-4 w-4" />
          ログイン
          </Button>
        </Link>
        </CardFooter>
      </Card>
      ) : !myAnswer ? (
      <Card>
        <CardHeader>
        <CardTitle>セキュリティ診断を開始</CardTitle>
        <CardDescription>
          あなたのセキュリティ知識をチェックしましょう。診断は一度のみ実施可能です。
        </CardDescription>
        </CardHeader>
        <CardFooter>
        <Link href="/assessment">
          <Button variant="custom">
          <ClipboardList className="mr-2 h-4 w-4" />
          診断を開始
          </Button>
        </Link>
        </CardFooter>
      </Card>
      ) : (
      <div className="space-y-6">
        <Card>
        <CardHeader>
          <CardTitle>診断結果</CardTitle>
          <CardDescription>
          あなたの診断結果は以下の通りです。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myAnswer.map((answer) => {
          const highScoreCategories = answer.category.filter(
            (cat) => cat.points >= 2,
          ).length;
          return (
            <div key={answer.partName}>
            <p>
              {answer.partName} : {highScoreCategories} /{" "}
              {answer.category.length} 点
            </p>
            </div>
          );
          })}
        </CardContent>
        <CardFooter>
          <Link href="/assessment-result">
          <Button variant="custom">
            <Search strokeWidth={3} className="mr-2 h-4 w-4" />
            詳細を見る
          </Button>
          </Link>
        </CardFooter>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>おすすめの教育コンテンツ</CardTitle>
          <CardDescription>
          あなたの診断結果に合わせたコンテンツをご用意しました。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
          <li>中級者向けセキュリティ対策講座</li>
          <li>最新のサイバー攻撃トレンド</li>
          <li>セキュリティポリシーの作成と実施</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="#">
          <Button variant="custom">
            <BookOpen className="mr-2 h-4 w-4" />
            E-learningを開始
          </Button>
          </Link>
        </CardFooter>
        </Card>
      </div>
      )}
    </div>
  );
};

export default HomePage;
