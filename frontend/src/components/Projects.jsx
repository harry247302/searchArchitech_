'use client'

import Link from 'next/link'
import Image from 'next/image'
import projects from '@/static-data/projects'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchRandomProjects } from '@/app/redux/slices/projectSlice/ProjectSlice'

export default function Projects() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchRandomProjects())
      console.log(res);

    }
    fetchData()
  })
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <Link
            href="/pages/projects"
            className="text-xl underline xl:text-base text-gray-800 font-semibold hover:underline"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="relative group overflow-hidden rounded-2xl shadow-lg h-[300px] bg-gray-100"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <CardContent className="relative z-20 h-full flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm line-clamp-2">{project.description}</p>
                <div>
                  <Link href='/pages/projects'>
                    <button className="mt-4 text-sm bg-primary text-black px-3 py-1 rounded-md self-start hover:bg-amber-950">
                      View More
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}