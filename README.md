# Secure Ryman - 情報セキュリティ対策推進サービス -
## 1. ディレクトリ構成
- /.husky huskyの設定ファイル
- /public ロゴ画像などの静的ファイル
- /prisma DBに関わるprismaのファイル
- /src 主要なプログラム
    - /lib shadcnライブラリで使用されるプログラム
    - /nginx nginxの設定ファイル
    - /types 型定義ファイル
    - /zod-types prismaスキーマのzod型定義ファイル
    - /app フロントエンドのプログラム
        - /_components コンポーネント
        - /_trpc trpcの設定
        - /_utils 汎用的な関数
        - /api trpcのエンドポイント
        - /assessment 診断画面プログラム
        - /assessment-result 診断結果画面プログラム
        - /e-learning eラーニング画面プログラム
        - /comparison 比較画面プログラム
        - /product 製品一覧画面プログラム
    - /server バックエンドのプログラム
        - /routers apiのプログラム
        - /utils 汎用的な関数
## 2. 開発環境
Docker Composeを使用し、開発環境を構築しています。
## 3. 主要技術スタック
- Next.js
- TypeScript
- Tailwind CSS
- Prisma(PostgreSQL)
- trpc
- zod
- nginx
- Docker
