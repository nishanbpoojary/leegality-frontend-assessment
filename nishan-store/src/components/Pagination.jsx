function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 5 page numbers around current page
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages
    if (currentPage <= 3) return pages.slice(0, 5)
    if (currentPage >= totalPages - 2) return pages.slice(-5)
    return pages.slice(currentPage - 3, currentPage + 2)
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pt-4">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-[8px] bg-white border border-gray-200 text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        ← Previous
      </button>

      {/* First page + ellipsis if needed */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-[8px] bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-1 text-gray-400">…</span>}
        </>
      )}

      {/* Page number buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-[8px] text-sm font-medium transition-all ${
            page === currentPage
              ? 'bg-[#2563eb] text-white border border-[#2563eb]'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page + ellipsis if needed */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-gray-400">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-[8px] bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-[8px] bg-white border border-gray-200 text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
