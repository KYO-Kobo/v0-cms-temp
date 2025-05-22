import Link from "next/link"
import { getContents } from "@/lib/microcms"
import type { BlogResponse } from "@/types/blog"
import BlogCard from "@/components/blog-card"

export default async function Home() {
  try {
    const data = (await getContents("blogs", { limit: 3 })) as BlogResponse

    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">ブログサイト</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              最新の記事
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">microCMSで作成したブログサイトへようこそ</p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.contents.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                すべての記事を見る
              </Link>
            </div>
          </div>
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
