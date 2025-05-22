import Link from "next/link"
import { getContents } from "@/lib/microcms"
import type { BlogResponse } from "@/types/blog"
import BlogCard from "@/components/blog-card"
import HeroSection from "@/components/hero-section"

// revalidateを明示的に設定し、時間を短くする
export const revalidate = 10

export default async function Home() {
  try {
    // キャッシュを無効化するためのオプションを追加
    const data = (await getContents("blogs", {
      limit: 3,
      fields: ["id", "title", "eyecatch", "category", "publishedAt"],
      _: new Date().getTime(),
    })) as BlogResponse

    return (
      <>
        {/* ファーストビュー */}
        <HeroSection />

        {/* 最新記事セクション */}
        <div id="latest-articles" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold tracking-wide uppercase text-blue-600">ブログ</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">最新の記事</p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">最新のトピックや役立つ情報をお届けします</p>
            </div>

            <div className="mt-12">
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
      </>
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
