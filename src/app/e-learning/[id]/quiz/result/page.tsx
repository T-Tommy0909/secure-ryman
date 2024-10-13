import { NextPage } from "next";
import { QuizResultField } from "@/app/_components/e-learning/quiz/result/QuizResultField";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

type LessonPageProps = {
  params: {
    id: string;
  };
};

const QuizResult: NextPage<LessonPageProps> = async ({ params }) => {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <div>
      <QuizResultField userId={session.user.sub} lessonId={params.id} />
    </div>
  );
};

export default QuizResult;
