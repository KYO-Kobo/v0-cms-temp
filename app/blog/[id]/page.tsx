import Image from "next/image"
import { notFound } from "next/navigation"
import { getContent, getContents } from "@/lib/microcms"
import type { Blog, BlogResponse } from "@/types/blog"
import { formatDate } from "@/lib/utils"

// revalidateの値を小さくする
export const revalidate = 10

export async function generateStaticParams() {
  try {
    const data = (await getContents("blogs")) as BlogResponse
    return data.contents.map((blog) => ({
      id: blog.id,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  try {
    // キャッシュを無効化するためのオプションを追加
    const blog = (await getContent("blogs", params.id, {
      _: new Date().getTime(),
    })) as Blog

    return (
      <div className="bg-white">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          {blog.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {blog.category.name}
              </span>
            </div>
          )}
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            公開日: {formatDate(blog.publishedAt)}
            {blog.revisedAt !== blog.publishedAt && ` (更新日: ${formatDate(blog.revisedAt)})`}
          </p>

          {blog.eyecatch && (
            <div className="relative h-64 sm:h-96 w-full mb-8">
              <Image
                src={blog.eyecatch.url || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog detail:", error)
    return notFound()
  }
}
