# microCMS ブログテンプレート

Next.js と microCMS を使用したブログサイトのテンプレートです。

## 機能

- microCMSからのブログ記事の取得と表示
- レスポンシブデザイン
- ブログ記事一覧ページ
- ブログ記事詳細ページ
- カテゴリー表示
- 最適化されたキャッシュ制御
- 魅力的なファーストビュー
- 記事プレビュー機能

## 必要条件

- Node.js 18.0.0以上
- microCMSアカウント

## セットアップ

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/yourusername/microcms-blog-template.git
cd microcms-blog-template
\`\`\`

### 2. 依存関係のインストール

\`\`\`bash
npm install
\`\`\`

### 3. microCMSの設定

1. [microCMS](https://microcms.io/)にログインし、新しいサービスを作成します。
2. 「API」→「APIの作成」をクリックします。
3. APIの名前を「blogs」に設定します。
4. 以下のフィールドを追加してください：
   - title (テキストフィールド) - 必須
   - content (リッチエディタ) - 必須
   - eyecatch (画像) - 任意
   - category (カテゴリー) - 任意
5. APIキーとサービスドメインをメモしておきます。

#### カテゴリーの設定

1. 「API」→「APIの作成」をクリックします。
2. APIの名前を「categories」に設定します。
3. 以下のフィールドを追加してください：
   - name (テキストフィールド) - 必須
4. いくつかのカテゴリーを作成します。
5. 「blogs」APIの「category」フィールドの参照先を「categories」に設定します。

#### プレビュー機能の設定

1. microCMSの管理画面で「サービス設定」→「API設定」→「画面プレビュー」を開きます。
2. 「画面プレビューボタンの表示」をオンにします。
3. 「遷移先URL」に以下のURLを設定します：
   \`\`\`
   https://あなたのドメイン/api/preview?contentId={CONTENT_ID}&draftKey={DRAFT_KEY}
   \`\`\`
4. 「変更する」ボタンをクリックして設定を保存します。

### 4. 環境変数の設定

`.env.local`ファイルをプロジェクトのルートに作成し、以下の内容を追加します：

\`\`\`
MICROCMS_API_KEY=あなたのAPIキー
MICROCMS_SERVICE_DOMAIN=あなたのサービスドメイン
\`\`\`

### 5. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで http://localhost:3000 を開いて、サイトを確認します。

## デプロイ

このテンプレートはVercelへのデプロイを推奨します。

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にアクセスし、アカウントを作成またはログインします。
2. 「New Project」をクリックし、このリポジトリをインポートします。
3. 環境変数を設定します：
   - `MICROCMS_API_KEY`
   - `MICROCMS_SERVICE_DOMAIN`
   - `REVALIDATE_SECRET` (オプション)
4. 「Deploy」をクリックします。

### Webhookの設定（オプション）

microCMSでコンテンツが更新された際に自動的にサイトを再ビルドするために、Webhookを設定することをお勧めします。

1. Vercelのプロジェクト設定で「Deployments」→「Git」→「Deploy Hooks」を開きます。
2. 新しいDeploy Hookを作成し、URLをコピーします。
3. microCMSの管理画面で「サービス設定」→「Webhook」を開きます。
4. 「Webhook URL」にVercelのDeploy Hook URLを入力します。
5. 「トリガー」で「コンテンツの公開」と「コンテンツの更新」を選択します。
6. 「追加」をクリックします。

## カスタマイズ

### ファーストビューの変更

`components/hero-section.tsx`を編集して、ファーストビューのデザインやテキストを変更できます。

\`\`\`tsx
// 背景画像の変更
<Image src="/your-image.jpg" alt="背景画像" fill className="object-cover" priority />

// テキストの変更
<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">あなたのサイト名</h1>
<p className="mt-6 text-xl text-gray-300 max-w-3xl">
  あなたのサイトの説明文をここに入力します。
</p>
\`\`\`

### カラーテーマの変更

`tailwind.config.js`を編集して、カラーテーマを変更できます。

\`\`\`js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#3B82F6", // 青色を別の色に変更
        // ...
      },
      // ...
    },
  },
},
\`\`\`

### レイアウトの変更

`app/layout.tsx`を編集して、サイト全体のレイアウトを変更できます。

## トラブルシューティング

### コンテンツが表示されない

- microCMSのAPIエンドポイント名が「blogs」であることを確認してください。
- 環境変数が正しく設定されていることを確認してください。
- microCMSでコンテンツが公開されていることを確認してください。

### 更新が反映されない

- キャッシュの問題の可能性があります。ブラウザのキャッシュをクリアするか、シークレットモードで確認してください。
- `revalidate`の値を調整することで、キャッシュの更新頻度を変更できます。

### プレビューが機能しない

- microCMSの「画面プレビュー」設定が正しく行われているか確認してください。
- 遷移先URLが正しく設定されているか確認してください。
- Vercelにデプロイしている場合は、環境変数が正しく設定されているか確認してください。

## ライセンス

MIT
