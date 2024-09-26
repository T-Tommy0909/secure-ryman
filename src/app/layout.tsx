import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
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
    <UserProvider>
      <html lang="ja">
        <body className={`${inter.className} bg-gray-100`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </UserProvider>
  );
}
