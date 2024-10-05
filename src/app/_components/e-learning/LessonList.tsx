import { FC } from "react";
import { serverApi } from "@/app/_trpc/server-api";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface Prop {
  userId: string;
}

const LessonList: FC<Prop> = async ({ userId }) => {
  const lessons = await serverApi.lessons.list({ userId });
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <Link href={`/e-learning/${lesson.id}`} key={lesson.id}>
          <div className="block bg-white border rounded-lg p-4 relative cursor-pointer">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{lesson.title}</h2>
                <p className="text-gray-600 mb-2">{lesson.description}</p>
                <div className="flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {lesson.isRecommended && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-tl-lg rounded-br-lg">
                推奨コンテンツ
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LessonList;
