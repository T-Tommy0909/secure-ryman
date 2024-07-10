import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/common/Header";
import Provider from "./_trpc/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Ryman - セキュリティ診断",
  description: "中小企業向けセキュリティ診断・教育アプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-100`}>
        <Header />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
