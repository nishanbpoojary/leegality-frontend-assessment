import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'

function Stars({ rating, size = 'base' }) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={`${sizeClass} ${rating >= star ? 'text-yellow-400' : rating >= star - 0.5 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
      <span className="text-sm text-gray-400">({rating.toFixed(1)})</span>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [reviewPage, setReviewPage] = useState(1)
  const reviewsPerPage = 3

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        const data = await getProductById(id)
        setProduct(data)
        setSelectedImage(0)
        setReviewPage(1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const totalReviewPages = product?.reviews ? Math.ceil(product.reviews.length / reviewsPerPage) : 0
  const paginatedReviews = product?.reviews?.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage
  ) || []

  return (
    <div className="h-auto min-h-screen bg-[#f0f2f5] py-6">
      {/* Centered card container */}
      <div className=" mx-auto px-6">
        <div className="bg-white shadow-sm overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="p-6">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6 bg-white border border-gray-200 px-4 py-2 rounded-[8px] hover:bg-gray-50 transition-all"
            >
              ← Back
            </button>

            {loading && <DetailSkeleton />}

            {error && (
              <div className="text-center py-20">
                <p className="text-red-500 text-lg mb-2">Something went wrong</p>
                <p className="text-sm text-gray-400 mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && product && (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT: Product Image */}
                <div className="lg:w-5/12">
                  <div className="bg-white flex items-center justify-center h-[400px] rounded-lg">
                    <img
                      src={product.images?.[selectedImage] ?? product.thumbnail}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  {/* Thumbnail gallery */}
                  {product.images?.length > 1 && (
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden bg-gray-50 transition-colors ${
                            i === selectedImage ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-contain p-1" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Product Info */}
                <div className="lg:w-7/12">
                  {/* Product Name */}
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>

                  {/* Price and Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Stars rating={product.rating} />
                  </div>

                  {/* Brand and Category */}
                  <div className="space-y-1 mb-6">
                    {product.brand && (
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">Brand:</span>{' '}
                        <span className="text-gray-600">{product.brand}</span>
                      </p>
                    )}
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">Category:</span>{' '}
                      <span className="text-gray-600 capitalize">{product.category}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Reviews */}
                  {product.reviews?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4">Reviews</h2>
                      <div className="space-y-4">
                        {paginatedReviews.map((review, i) => (
                          <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-gray-800">{review.reviewerName}</span>
                              <Stars rating={review.rating} size="sm" />
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pagination at bottom */}
            {!loading && !error && product && (
              <Pagination
                currentPage={reviewPage}
                totalPages={totalReviewPages > 0 ? totalReviewPages : 1}
                onPageChange={(page) => setReviewPage(page)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
      <div className="lg:w-5/12">
        <div className="h-[400px] bg-gray-100 rounded-lg" />
      </div>
      <div className="lg:w-7/12 space-y-4">
        <div className="h-8 bg-gray-100 rounded w-3/4" />
        <div className="h-8 bg-gray-100 rounded w-1/3" />
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-6 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
