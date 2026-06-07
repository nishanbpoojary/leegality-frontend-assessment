import { useState } from 'react'

function FilterSidebar({ categories, brands, filters, onCategoryChange, onPriceApply, onBrandToggle }) {
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <aside className="w-full flex-shrink-0">
      {/* Search box */}
      <div className="mb-5">
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {filteredCategories.map(cat => (
            <label
              key={cat.slug}
              className="flex items-center gap-2.5 cursor-pointer group py-1"
            >
              <input
                type="checkbox"
                checked={filters.category === cat.slug}
                onChange={() => onCategoryChange(filters.category === cat.slug ? null : cat.slug)}
                className="w-4 h-4 accent-blue-600 cursor-pointer rounded flex-shrink-0"
              />
              <span className={`text-sm group-hover:text-gray-900 transition-colors ${
                filters.category === cat.slug ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Price Range</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            min={0}
            className="w-1/2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            min={0}
            className="w-1/2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <button
          onClick={() => onPriceApply(minPrice, maxPrice)}
          className="w-full bg-blue-600 text-white text-sm py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium"
        >
          Apply
        </button>
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">Brands</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {brands.map(brand => (
              <label
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer group py-1"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer rounded flex-shrink-0"
                />
                <span className={`text-sm group-hover:text-gray-900 transition-colors ${
                    filters.brands.includes(brand) ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

export default FilterSidebar
