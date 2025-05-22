export default function Loading() {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/6"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 w-1/4"></div>

        <div className="h-64 sm:h-96 bg-gray-200 rounded animate-pulse mb-8"></div>

        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
