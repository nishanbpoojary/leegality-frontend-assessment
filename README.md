# Nishan — Leegality Frontend Assessment

An Amazon-style product listing and detail app built with React, using the [DummyJSON](https://dummyjson.com/docs/products) public API.

## Deployment Link - Vercel
https://leegality-frontend-assessment.vercel.app/

## Setup Instructions

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build
```

## Features

- **Product Listing Page** — responsive grid with skeleton loading, centered card layout
- **Filters** — category (API-driven), price range, brand (multi-select), all combinable
- **Show/Hide Filters toggle** — collapse the filter sidebar to give the product grid more room
- **Active filter chips** — see and remove applied filters individually, or clear all at once
- **Filter persistence** — filters are stored in the URL, so navigating back from a product page preserves the exact filter state
- **Product Detail Page** — image gallery with thumbnails, full product info, reviews
- **Pagination** — client-side after filtering, resets to page 1 whenever filters change
- **Loading & error states** — skeleton placeholders while fetching, retry UI on failure

## Assumptions

- Brand and price filtering is done client-side (the API has no server-side support for these). All products for the selected category are fetched upfront (max ~194 products — well within reason for a demo app).
- The search bar in the navbar is a visual element; the three sidebar filters (category, price, brand) are the required filters per the spec.
- Category selection is single-select; brand selection is multi-select. This matches typical e-commerce UX and fits how the DummyJSON category API works.
- Products with no `brand` field (~92 of 194) are excluded from the brand filter list but still appear in the product grid.

## Architectural Decisions

### URL as filter state
Filters are stored in URL search params (`?category=smartphones&brand=Apple&page=2`) rather than React state or Context. This gives filter persistence across navigation for free — the browser's back button restores the exact URL, and the listing page re-derives state from it on mount. It also makes filtered views shareable via URL.

### Client-side filtering after one API call
When a category is selected, all products in that category are fetched once (`limit=200`). Price and brand filters are then applied in-memory. This avoids multiple API round-trips on each filter interaction and keeps the UX snappy.

### Collapsible filter sidebar
The sidebar is shown by default (filters are the primary navigation tool on a listing page) but can be toggled off via a "Hide/Show Filters" button so the product grid can use the full width — useful on narrower screens or when a user just wants to browse.

### Component structure
```
src/
├── pages/
│   ├── ProductListingPage.jsx   # filter state, fetch logic, layout, sidebar toggle
│   └── ProductDetailPage.jsx    # single product fetch, image gallery, reviews
├── components/
│   ├── Navbar.jsx               # search bar + cart/account icons
│   ├── ProductCard.jsx          # image, title, price, star rating
│   ├── FilterSidebar.jsx        # categories, price range, brands
│   ├── ActiveFilters.jsx        # chips showing applied filters, removable
│   └── Pagination.jsx
└── services/
    └── api.js                   # all fetch calls in one place
```

## Improvements Given More Time

- **Debounced price range** — apply price filter as the user types, without needing an Apply button
- **Navbar search** — wire up the search bar to filter by product title across all products
- **Persistent cart** — add to cart via localStorage, show count in navbar
- **Image zoom** on product detail page
- **Unit tests** — test filter logic with Vitest + React Testing Library

