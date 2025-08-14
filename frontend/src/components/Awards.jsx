'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import logos from '@/static-data/awards'

export default function Awards() {
  const sliderRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const scrollSpeed = 2 // control scroll speed

    const animate = () => {
      if (!slider) return

      slider.scrollLeft += scrollSpeed

      // Loop back
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const infiniteLogos = [...logos, ...logos]

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Awards and Events</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div
            ref={sliderRef}
            className="flex gap-8 whitespace-nowrap"
            style={{
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'auto',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
          >
            <div className="flex gap-8" style={{ width: 'max-content' }}>
              {infiniteLogos.map((src, idx) => (
                <div
                  key={idx}
                  className="min-w-[150px] h-[80px] bg-white rounded-xl shadow flex items-center justify-center"
                >
                  <Image
                    src={src}
                    alt={`Logo ${idx}`}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hide scrollbar for WebKit (Chrome, Safari) */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
