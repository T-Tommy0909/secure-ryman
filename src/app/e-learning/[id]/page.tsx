import { NextPage } from "next";
import { Suspense } from "react";
import LessonViewer from "@/app/_components/e-learning/LessonViewer";
import { Button } from "@/app/_components/ui/button";
import { serverApi } from "@/app/_trpc/server-api";
import { getPdfUrlFromS3 } from "@/app/_utils/s3";
import Link from "next/link";

type LessonPageProps = {
  params: {
    id: string;
  };
};

const LessonPage: NextPage<LessonPageProps> = async ({ params }) => {
  try {
    const lessonData = await serverApi.lessons.get({ id: params.id });
    const pdfUrl = await getPdfUrlFromS3(`${lessonData.fileName}`);

    return (
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {lessonData.title}
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <LessonViewer pdfUrl={pdfUrl} />
          </Suspense>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          教材が見つかりませんでした
        </h2>
        <Link href="/e-learning">
          <Button variant="custom">教材一覧ページに戻る</Button>
        </Link>
      </div>
    );
  }
};

export default LessonPage;
