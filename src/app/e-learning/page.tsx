import { NextPage } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import LessonList from "../_components/e-learning/LessonList";

const Elearning: NextPage = async () => {
  const session = await getSession();
  if (!session || !session.user.sub) {
    redirect("/api/auth/login");
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <main>
        <h1 className="text-3xl font-bold mb-6">E-learning 一覧</h1>
        <LessonList userId={session.user.sub} />
      </main>
    </div>
  );
};

export default Elearning;
