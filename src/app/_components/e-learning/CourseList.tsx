import { FC } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  tags: string[];
  isRecommended: boolean;
}

const courses: Course[] = [
  {
    id: "1",
    title: "メールによる攻撃の対策",
    description: "メールによる攻撃の対策について学びます。",
    tags: ["基本的対策", "メール送受信"],
    isRecommended: true,
  },
  {
    id: "2",
    title: "安全なパスワードの生成",
    description: "安全なパスワードの生成の仕方について学びます。",
    tags: ["基本的対策", "パスワード"],
    isRecommended: true,
  },
  {
    id: "3",
    title: "ウイルス対策方法",
    description: "ウイルス対策方法について学びます。",
    tags: ["基本的対策", "ウイルス対策"],
    isRecommended: false,
  },
  {
    id: "4",
    title: "不正アクセスの現状",
    description: "不正アクセスの現状について学びます。",
    tags: ["基本的対策", "アクセス制御"],
    isRecommended: false,
  },
  {
    id: "5",
    title: "OSやソフトウェアの更新",
    description: "OSやソフトウェアの更新の重要性について学びます。",
    tags: ["基本的対策"],
    isRecommended: false,
  },
];

const CourseList: FC = () => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Link href={`/e-learning/${course.id}`} key={course.id}>
          <div className="block bg-white border rounded-lg p-4 relative cursor-pointer">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
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
            {course.isRecommended && (
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

export default CourseList;
