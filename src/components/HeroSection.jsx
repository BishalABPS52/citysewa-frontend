'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { featuredServices } from '@/lib/data'
import LogoAnimation from '@/components/LogoAnimation'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50"></div>

      {/* Floating service cards background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 transform rotate-12">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-40 right-20 transform -rotate-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-40 left-20 transform rotate-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 transform -rotate-12">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-slide-up">
            Find Local{' '}
            <span className="bg-gradient-to-r from-cityserve-pink to-cityserve-orange bg-clip-text text-transparent">
              Services
            </span>
            <br />
            Near You
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up-delay">
            Connect with trusted local professionals for all your needs.
            From plumbers to tutors, find the perfect service provider in your city.
          </p>
        </div>

        {/* Search bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="What service do you need? (e.g., plumber, tutor, chef)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-lg bg-card border-border"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-cityserve-pink hover:bg-cityserve-pink/90 text-white font-semibold"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/auth";
              }}
            >
              Find Services
            </Button>
          </form>
        </div>

        {/* Popular services */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">Popular services:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {featuredServices.map((service) => (
              <Badge
                key={service.id}
                variant="secondary"
                className="px-3 py-1 hover:bg-cityserve-pink hover:text-white cursor-pointer transition-colors"
              >
                {service.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Get Started CTA removed */}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cityserve-pink">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Verified Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cityserve-teal">10k+</div>
            <div className="text-sm text-muted-foreground mt-1">Services Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cityserve-orange">4.8★</div>
            <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
