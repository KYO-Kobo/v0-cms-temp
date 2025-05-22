import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ブログサイト
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                ホーム
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                ブログ
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
