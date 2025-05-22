import Image from "next/image"
import { notFound } from "next/navigation"
import { getContent, getContents } from "@/lib/microcms"
import type { Blog, BlogResponse } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import TableOfContents from "@/components/table-of-contents"
import { draftMode } from "next/headers"
import PreviewBanner from "@/components/preview-banner"

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

// 見出しにIDを付与する関数
function addIdsToHeadings(content: string): string {
  // h1タグを検索して、idを追加
  return content.replace(/<h1>(.*?)<\/h1>/g, (match, text) => {
    // テキストからIDを生成（スペースをハイフンに変換し、小文字に）
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") // 英数字、ハイフン、アンダースコア以外を削除

    return `<h1 id="${id}">${text}</h1>`
  })
}

export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { draftKey?: string }
}) {
  const { isEnabled } = draftMode()
  const draftKey = searchParams.draftKey

  try {
    // draftKeyがある場合はプレビュー用のクエリを追加
    const queries = {
      _: new Date().getTime(),
      ...(draftKey ? { draftKey } : {}),
    }

    // キャッシュを無効化するためのオプションを追加
    const blog = (await getContent("blogs", params.id, queries)) as Blog

    // 見出しにIDを付与
    const contentWithIds = addIdsToHeadings(blog.content)

    return (
      <>
        {/* プレビューモードの場合はバナーを表示 */}
        {isEnabled && <PreviewBanner />}

        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* メインコンテンツ */}
              <div className="lg:col-span-2">
                <div className="max-w-3xl">
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

                  <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: contentWithIds }} />
                </div>
              </div>

              {/* サイドバー（目次） */}
              <div className="lg:col-span-1">
                <TableOfContents />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error("Error fetching blog detail:", error)
    return notFound()
  }
}
