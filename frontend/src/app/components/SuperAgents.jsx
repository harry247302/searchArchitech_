"use client"

import React from 'react'
import Image from 'next/image'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import superAgents from '@/static-data/superAgents'

const SuperAgents = () => {
  return (
    <section className="w-full bg-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Meet Our Super Agents
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          A SuperAgent is an agent who is property seeker obsessed.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-6" style={{ alignItems: 'center' }}>
        {/* Postcode Card */}
        <Card className="h-full md:col-span-1">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <Image
              src='/superAgents/image.png'
              width={64}
              height={64}
              className="rounded-full mx-auto object-cover"
              alt="Agent Sample"
            />
            <p className="text-sm text-gray-600 mt-4 mb-2">
              Enter your postcode to find mortgage brokers near you.
            </p>
            <label className="text-sm font-medium block mb-1">Postcode</label>
            <Input type="number" placeholder="Enter postcode" className="mb-4" />
            <Button className="w-full text-black">Find an Agent</Button>
          </CardContent>
        </Card>

        {/* Carousel Section */}
        <div className="md:col-span-3 relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="p-0 bg-transparent">
              {superAgents.map((superAgent, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="h-full p-0 shadow-md">
                    <div className="bg-black text-white text-center py-1 text-xs font-normal rounded-t-xl">
                      Super Agent
                    </div>
                    <CardContent className="flex flex-col items-center p-4">
                      <Image
                        className="rounded-full object-cover mb-3"
                        src={superAgent.image}
                        alt={superAgent.name}
                        width={60}
                        height={60}
                      />
                      <h3 className="text-sm font-semibold mb-1">
                        {superAgent.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{superAgent.role}</p>
                      <p className="flex items-center text-xs text-gray-500 mb-3">
                        <MapPinIcon className="w-4 h-4 mr-1 text-blue-600" />
                        {superAgent.address}
                      </p>
                      <a
                        href="/super-agents"
                        className="text-xs text-blue-600 underline mb-2 hover:text-blue-700"
                      >
                        See more details
                      </a>
                      <Button className="w-full text-xs text-black">
                        Request a call back
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Always-visible arrows, responsive size and style */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow border rounded-full hover:bg-gray-100" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow border rounded-full hover:bg-gray-100" />
          </Carousel>

          {/* Mobile hint */}
          <p className="text-center text-sm text-gray-400 sm:hidden mt-3">
            Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  )
}

export default SuperAgents;