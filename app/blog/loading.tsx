export default function Loading() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:text-center mb-10">
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="px-4 py-5 sm:p-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
