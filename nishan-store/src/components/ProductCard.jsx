import { useNavigate } from 'react-router-dom'

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = rating >= star
          const half = !filled && rating >= star - 0.5
          return (
            <span key={star} className={`text-xs ${filled || half ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          )
        })}
      </div>
      <span className="text-xs text-gray-400">({rating.toFixed(1)})</span>
    </div>
  )
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { id, title, price, rating, thumbnail } = product

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white rounded-lg cursor-pointer border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-200 overflow-hidden flex flex-col h-full"
    >
      {/* Image container */}
      <div className="bg-white flex items-center justify-center h-32 p-4">
        <img
          src={thumbnail}
          alt={title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="px-3 pb-3 pt-2 flex flex-col flex-1">
        <h3 className="text-sm text-gray-800 font-medium leading-tight mb-1.5 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-gray-900">${price.toFixed(2)}</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
