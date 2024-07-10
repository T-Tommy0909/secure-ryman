import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "../_trpc/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "セキュリティ診断",
  description: "セキュリティ診断のページです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
