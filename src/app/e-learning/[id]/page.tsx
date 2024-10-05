import { Suspense } from "react";
import LessonViewer from "@/app/_components/e-learning/LessonViewer";
import { getPdfUrlFromS3 } from "@/app/_utils/s3";

export default async function LessonPage({
  params,
}: {
  params: { id: string };
}) {
  // const lessonData = await fetchLessonData(params.id);
  const lessonData = {
    title: "Lesson Title",
    filename: "SecureRyman_パスワード.pdf",
  };
  const pdfUrl = await getPdfUrlFromS3(`${lessonData.filename}`);

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
}
