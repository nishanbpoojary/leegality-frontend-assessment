const BASE_URL = 'https://dummyjson.com'

export async function getProducts({ limit = 12, skip = 0 } = {}) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProductsByCategory(category, { limit = 12, skip = 0 } = {}) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  )
  if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`)
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product: ${id}`)
  return res.json()
}
