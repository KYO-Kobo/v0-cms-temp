import { getContents } from "@/lib/microcms"
import type { BlogResponse } from "@/types/blog"
import BlogCard from "@/components/blog-card"

// revalidateの値を小さくする
export const revalidate = 10

export default async function BlogPage() {
  try {
    // キャッシュを無効化するためのオプションを追加
    const data = (await getContents("blogs", {
      limit: 10,
      fields: ["id", "title", "eyecatch", "category", "publishedAt"],
      _: new Date().getTime(),
    })) as BlogResponse

    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">ブログ記事一覧</h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.contents.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {data.contents.length === 0 && <p className="text-center text-gray-500 mt-10">記事がありません</p>}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return (
      <div className="bg-gray-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">データの取得に失敗しました</h2>
          <p className="text-gray-600 mb-6">microCMSのAPIエンドポイントが正しく設定されているか確認してください。</p>
          <p className="text-sm text-gray-500">エンドポイント名が「blogs」であることを確認してください。</p>
        </div>
      </div>
    )
  }
}
