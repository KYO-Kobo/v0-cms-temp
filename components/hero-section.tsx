import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="背景画像" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
      </div>

      {/* コンテンツ */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 min-h-[80vh] flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">ブログサイト</h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          microCMSを使用した最新の情報発信プラットフォーム。
          技術、デザイン、ライフスタイルなど、さまざまなトピックについての記事をお届けします。
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100"
          >
            記事一覧を見る
          </Link>
          <Link
            href="#latest-articles"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-800"
          >
            最新記事へ
          </Link>
        </div>
      </div>
    </div>
  )
}
