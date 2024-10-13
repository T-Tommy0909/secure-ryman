"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function LessonViewer({
  lessonNum,
  pdfUrl,
}: {
  lessonNum: string;
  pdfUrl: string;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="p-6">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page pageNumber={pageNumber} width={800} />
        </Document>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          もどる
        </button>
        <span className="text-sm text-gray-700">
          ページ {pageNumber} / {numPages}
        </span>
        {pageNumber === numPages ? (
          <Link href={`/e-learning/${lessonNum}/quiz`}>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
              確認テストへ
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= (numPages || 0)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            つぎへ
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
