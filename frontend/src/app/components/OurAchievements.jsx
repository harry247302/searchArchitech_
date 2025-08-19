'use client'

import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from './ui/card'

const stats = [
  { label: 'Total Listings', value: 10450 },
  { label: 'Agents Registered', value: 3250 },
  { label: 'Properties Sold', value: 8760 },
  { label: 'Happy Clients', value: 11900 },
]

export default function OurAchievements() {
  return (
    <section className="w-full bg-indigo-50 py-8 px-4 sm:px-4 lg:px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          Our Achievements
        </h2>
        <div className='max-w-5xl mx-auto'>
          <p className="text-xl sm:text-xl text-center mb-8 w-full">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi aperiam repellendus quis commodi inventore eum accusantium voluptatibus ut nisi ducimus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value }) {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <Card ref={ref} className="text-center shadow-sm">
      <CardContent className="py-8">
        <div className="text-4xl sm:text-5xl font-bold text-[#be8e5a] mb-2 flex items-center justify-center">
          {inView ? <CountUp start={0} end={value} duration={2.5} separator="," /> : 0}
          <span className="text-2xl text-[#be8e5a]">+</span>
        </div>
        <p className="text-sm sm:text-base text-gray-700 font-medium">{label}</p>
      </CardContent>
    </Card>
  )
}