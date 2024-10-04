import { NextPage } from "next";
import CourseList from "../_components/e-learning/CourseList";

const Elearning: NextPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <main>
        <h1 className="text-3xl font-bold mb-6">E-learning 一覧</h1>
        <CourseList />
      </main>
    </div>
  );
};

export default Elearning;
