function Navbar() {
  return (
    <header className="bg-[#2d3748] text-white h-[60px] px-5 flex items-center">
      {/* Left: Hamburger menu */}
      <button className="text-white p-2 rounded hover:bg-white/10 transition-colors flex-shrink-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Center: Search bar - compact 360px max, centered */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-white rounded-lg w-full max-w-[360px]">
          <span className="pl-3 pr-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 py-2 pr-3 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right: Cart and User icons only */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button title="Cart" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button title="Account" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar
