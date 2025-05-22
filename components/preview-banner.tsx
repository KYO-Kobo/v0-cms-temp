import Link from "next/link"

export default function PreviewBanner() {
  return (
    <div className="bg-blue-600 text-white py-2 px-4 text-center sticky top-0 z-50">
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm font-medium">プレビューモードで表示しています</p>
        <Link
          href="/api/preview/exit"
          className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          プレビューを終了
        </Link>
      </div>
    </div>
  )
}
