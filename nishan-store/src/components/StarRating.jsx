function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star
          const half = !filled && rating >= star - 0.5
          return (
            <span key={star}>
              {filled ? '★' : half ? '⭑' : '☆'}
            </span>
          )
        })}
      </div>
      <span className="text-gray-500">({rating.toFixed(1)})</span>
      {count !== undefined && (
        <span className="text-gray-400 text-xs">{count} reviews</span>
      )}
    </div>
  )
}

export default StarRating
