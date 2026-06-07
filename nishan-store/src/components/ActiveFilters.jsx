function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 hover:text-blue-900 font-bold leading-none"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  )
}

function ActiveFilters({
  category, minPrice, maxPrice, brands, categories,
  onClearCategory, onClearPrice, onClearBrand, onClearAll,
}) {
  const hasFilters = category || minPrice || maxPrice || brands.length > 0
  if (!hasFilters) return null

  const categoryName = categories.find(c => c.slug === category)?.name ?? category

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <span className="text-xs text-gray-500 font-medium">Active filters:</span>

      {category && (
        <Chip label={categoryName} onRemove={onClearCategory} />
      )}

      {(minPrice || maxPrice) && (
        <Chip
          label={`$${minPrice || '0'} – $${maxPrice || '∞'}`}
          onRemove={onClearPrice}
        />
      )}

      {brands.map(brand => (
        <Chip key={brand} label={brand} onRemove={() => onClearBrand(brand)} />
      ))}

      <button
        onClick={onClearAll}
        className="text-xs text-red-500 hover:text-red-700 hover:underline ml-1"
      >
        Clear all
      </button>
    </div>
  )
}

export default ActiveFilters
