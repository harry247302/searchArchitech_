'use client'

import Image from 'next/image'
import Link from 'next/link'
import wallpapers from '@/static-data/premiumWallpapers'

export default function PremiumWallpapers() {
  return (
    <section className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Premium Wallpapers</h2>
          <Link
            href="/categories"
            className="text-2xl underline sm:text-base text-gray-800 font-semibold hover:underline"
          >
            Show All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <Image
                src={wallpaper.src}
                alt={wallpaper.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={wallpaper.companyLogo}
                    alt="Company Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {wallpaper.title}
                  </span>
                </div>
                <div>
                <Link href='/categories/wallpapers'>
                <button className="text-sm bg-primary text-black  px-3 py-1 rounded-md hover:bg-amber-950">
                  View
                </button>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}