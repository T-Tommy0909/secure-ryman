import { NextPage } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import {
  ClipboardList,
  BookOpen,
  LogIn,
  Search,
  Boxes,
  ChartColumn,
} from "lucide-react";
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
  const userRole = sesstion
    ? await serverApi.users.fetchUserType({
        id: sesstion.user.sub,
      })
    : null;
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
        <div className="space-y-6">
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
        </div>
      ) : userRole === "ORDINARY" ? (
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
              <Link href="/e-learning">
                <Button variant="custom">
                  <BookOpen className="mr-2 h-4 w-4" />
                  E-learningを開始
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
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
              <Link href="/e-learning">
                <Button variant="custom">
                  <BookOpen className="mr-2 h-4 w-4" />
                  E-learningを開始
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>他社とのセキュリティ対策を比較</CardTitle>
              <CardDescription>
                同業他社とのセキュリティ対策を比較し、自社のセキュリティ対策の改善点を見つけましょう。
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/comparison">
                <Button variant="custom">
                  <ChartColumn className="mr-2 h-4 w-4" />
                  比較を開始
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>導入実績のあるセキュリティ商品を確認</CardTitle>
              <CardDescription>
                同業他社で導入実績のあるセキュリティ商品を確認し、導入を検討しましょう。
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/product">
                <Button variant="custom">
                  <Boxes className="mr-2 h-4 w-4" />
                  商品を確認
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
