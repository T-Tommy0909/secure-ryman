import { NextPage } from "next";
import { QuizField } from "@/app/_components/e-learning/quiz/QuizField";
import { serverApi } from "@/app/_trpc/server-api";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

type LessonPageProps = {
  params: {
    id: string;
  };
};

const Quiz: NextPage<LessonPageProps> = async ({ params }) => {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/login");
  }

  const lesson = await serverApi.lessons.get({ id: params.id });
  const quizList = await serverApi.quizzes.list({ lessonId: params.id });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {`${lesson.title} -確認テスト-`}
        </h1>
        <QuizField
          quizList={quizList}
          userId={session.user.sub}
          lessonId={params.id}
        />
      </div>
    </div>
  );
};

export default Quiz;
