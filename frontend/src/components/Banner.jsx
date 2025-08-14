'use client'

import SearchBanner from '@/components/SearchBanner'

export default function Banner() {
  return (
    <section
      className="relative w-full h-[600px] bg-cover bg-left bg-no-repeat"
      style={{ backgroundImage: "url('/banner/image.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" />

      {/* Centered search bar container */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto">
          <SearchBanner />
        </div>
      </div>
    </section>
  )
}