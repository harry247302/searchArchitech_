'use client'

import Link from 'next/link'
import Image from 'next/image'
// import projects from '@/static-data/projects'
import { Card, CardContent } from './ui/card'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomProjects } from '@/app/redux/slices/projectSlice/ProjectSlice'

export default function Projects() {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.project.projects)
    // console.log(projectss);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await dispatch(fetchRandomProjects())
                console.log(res);

            } catch (error) {
                console.log(error);

            }
        }
        fetchProjects()
    }, [])
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
                            {/* Image background */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            {/* Card Content */}
                            <CardContent className="relative z-20 h-full flex flex-col justify-end p-4 text-white">
                                {/* BIG TITLE */}
                                <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-md">
                                    {project.title}
                                </h3>

                                {/* Render HTML description safely */}
                                <div
                                    className="project-description text-sm line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                ></div>

                                {/* Button */}
                                <div>
                                    <Link href="/pages/projects">
                                        <button className="mt-4 text-sm bg-primary text-black px-4 py-2 rounded-md self-start hover:bg-amber-950 transition">
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