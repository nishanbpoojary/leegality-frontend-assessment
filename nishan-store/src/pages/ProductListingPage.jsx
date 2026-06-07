import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getProductsByCategory, getCategories } from '../services/api'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import FilterSidebar from '../components/FilterSidebar'
import ActiveFilters from '../components/ActiveFilters'

const PRODUCTS_PER_PAGE = 8

function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || null
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const selectedBrands = searchParams.getAll('brand')
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      setError(null)
      try {
        const data = category
          ? await getProductsByCategory(category, { limit: 200, skip: 0 })
          : await getProducts({ limit: 200, skip: 0 })
        setAllProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [category])

  const availableBrands = useMemo(() => {
    const brands = allProducts.map(p => p.brand).filter(Boolean)
    return [...new Set(brands)].sort()
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const min = parseFloat(minPrice)
      const max = parseFloat(maxPrice)
      if (!isNaN(min) && p.price < min) return false
      if (!isNaN(max) && p.price > max) return false
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
      return true
    })
  }, [allProducts, minPrice, maxPrice, selectedBrands])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  function updateParams(updater) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      updater(next)
      return next
    })
  }

  function handleCategoryChange(slug) {
    updateParams(p => {
      slug ? p.set('category', slug) : p.delete('category')
      p.delete('brand')
      p.set('page', '1')
    })
  }

  function handlePriceApply(min, max) {
    updateParams(p => {
      min ? p.set('minPrice', min) : p.delete('minPrice')
      max ? p.set('maxPrice', max) : p.delete('maxPrice')
      p.set('page', '1')
    })
  }

  function handleBrandToggle(brand) {
    updateParams(p => {
      const current = p.getAll('brand')
      p.delete('brand')
      const next = current.includes(brand)
        ? current.filter(b => b !== brand)
        : [...current, brand]
      next.forEach(b => p.append('brand', b))
      p.set('page', '1')
    })
  }

  function handlePageChange(page) {
    updateParams(p => p.set('page', String(page)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleClearAll() {
    setSearchParams(new URLSearchParams())
  }

  function handleClearPrice() {
    updateParams(p => { p.delete('minPrice'); p.delete('maxPrice'); p.set('page', '1') })
  }

  function handleClearBrand(brand) {
    updateParams(p => {
      const current = p.getAll('brand').filter(b => b !== brand)
      p.delete('brand')
      current.forEach(b => p.append('brand', b))
      p.set('page', '1')
    })
  }

  const filters = { category, minPrice, maxPrice, brands: selectedBrands }

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-6">
      {/* Centered card container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Navbar inside the card */}
          <Navbar />

          <main className="px-4 py-5">
            {/* Filter toggle */}
            <button
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="flex gap-5 items-start">
              {/* Sidebar — toggled by the filter button above */}
              {sidebarOpen && (
                <div className="w-56 flex-shrink-0">
                  <FilterSidebar
                    categories={categories}
                    brands={availableBrands}
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onPriceApply={handlePriceApply}
                    onBrandToggle={handleBrandToggle}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {/* Filters Header */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h2 className="text-base font-semibold text-gray-800">Filters</h2>
                </div>

                <ActiveFilters
                  category={category}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  brands={selectedBrands}
                  categories={categories}
                  onClearCategory={() => handleCategoryChange(null)}
                  onClearPrice={handleClearPrice}
                  onClearBrand={handleClearBrand}
                  onClearAll={handleClearAll}
                />

                {loading && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                      <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                        <div className="h-44 bg-gray-200" />
                        <div className="p-3 space-y-2 border-t border-gray-100">
                          <div className="h-3.5 bg-gray-200 rounded w-full" />
                          <div className="h-3.5 bg-gray-200 rounded w-3/4" />
                          <div className="h-3.5 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <div className="text-center py-20">
                    <p className="text-red-500 text-lg mb-2">Something went wrong</p>
                    <p className="text-sm text-gray-400 mb-4">{error}</p>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!loading && !error && (
                  <>
                    <p className="text-sm text-gray-500 mb-5">{filteredProducts.length} products found</p>

                    {paginatedProducts.length === 0 ? (
                      <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-2">No products found</p>
                        <p className="text-sm text-gray-400 mb-4">Try adjusting or clearing your filters.</p>
                        <button
                          onClick={handleClearAll}
                          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm"
                        >
                          Clear all filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {paginatedProducts.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage