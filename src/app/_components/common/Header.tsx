import React from "react";
import { BookOpen, ChartNoAxesColumnIncreasing, House } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/secure-ryman-logo.svg"
                alt="Secure Ryman Logo"
                className="w-9 h-9"
              />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Secure Ryman
              </span>
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-800">
                  <House className="w-6 h-6 inline-block mr-1" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/assessment-result"
                  className="text-gray-600 hover:text-blue-800"
                >
                  <ChartNoAxesColumnIncreasing className="w-6 h-6 inline-block mr-1" />
                  診断結果
                </Link>
              </li>
              <li>
                <Link
                  href="/e-learning"
                  className="text-gray-600 hover:text-blue-800"
                >
                  <BookOpen className="w-6 h-6 inline-block mr-1" />
                  E-learning
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
