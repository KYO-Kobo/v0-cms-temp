import Image from "next/image"
import Link from "next/link"
import type { Blog } from "@/types/blog"
import { formatDate } from "@/lib/utils"

type Props = {
  blog: Blog
}

export default function BlogCard({ blog }: Props) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {blog.eyecatch && (
        <div className="relative h-48 w-full">
          <Image src={blog.eyecatch.url || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        {blog.category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
            {blog.category.name}
          </span>
        )}
        <Link href={`/blog/${blog.id}`}>
          <h3 className="text-lg leading-6 font-medium text-gray-900 hover:underline">{blog.title}</h3>
        </Link>
        <p className="mt-2 text-sm text-gray-500">公開日: {formatDate(blog.publishedAt)}</p>
      </div>
    </div>
  )
}
