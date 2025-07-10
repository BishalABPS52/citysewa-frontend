'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Provider card component
const ProviderCard = ({ provider, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all group"
    >
      <div className="relative h-48 bg-gradient-to-br from-cityserve-pink/20 to-cityserve-orange/20 overflow-hidden">
        <Image 
          src={provider.image} 
          alt={provider.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="inline-block bg-gradient-to-r from-cityserve-pink to-cityserve-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
            {provider.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl">{provider.name}</h3>
            <div className="flex items-center mt-1 space-x-1">
              <div className="flex text-cityserve-orange">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(provider.rating) ? "" : "text-muted-foreground/30"}>★</span>
                ))}
              </div>
              <span className="font-medium">{provider.rating}</span>
              <span className="text-muted-foreground text-sm">({provider.reviews} reviews)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">{provider.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-cityserve-pink">NPR {provider.price}</div>
            <div className="text-xs text-muted-foreground">per hour</div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">{provider.description}</p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="bg-muted text-xs rounded-full px-3 py-1 transition-colors hover:bg-cityserve-pink/10">
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="bg-muted text-xs rounded-full px-3 py-1">
              +{provider.skills.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            provider.availability.includes('Now') 
              ? 'bg-cityserve-green/10 text-cityserve-green' 
              : 'bg-cityserve-orange/10 text-cityserve-orange'
          }`}>
            Available {provider.availability}
          </span>
          <div className="flex space-x-3">
            <Link 
              href="#" 
              className="text-sm font-medium text-cityserve-pink hover:underline"
            >
              View Profile
            </Link>
            <Link 
              href="#" 
              className="text-sm font-medium text-cityserve-pink hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Reviews component
const CustomerReview = ({ review, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
      className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cityserve-pink to-cityserve-orange flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-bold">{review.customer.name.charAt(0)}</span>
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-semibold">{review.customer.name}</h4>
            <span className="mx-2 text-muted-foreground">•</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(review.rating) ? "text-cityserve-orange" : "text-muted-foreground/30"}>★</span>
              ))}
              <span className="ml-1 text-sm text-muted-foreground">({review.rating})</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">{review.service}</span>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProviders() {
  // Sample provider data
  const providers = [
    {
      id: 1,
      name: "Ramesh Sharma",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      category: "Plumbing",
      rating: 4.8,
      reviews: 124,
      location: "Baluwatar",
      description: "Professional plumber with over 10 years of experience in residential and commercial plumbing.",
      skills: ["Pipe Repair", "Fixture Installation", "Water Heaters", "Drain Cleaning"],
      price: 1200,
      availability: "Now"
    },
    {
      id: 3,
      name: "Bijay Tamang",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      category: "Electrical",
      rating: 4.7,
      reviews: 156,
      location: "Patan",
      description: "Licensed electrician specializing in residential wiring, lighting, and electrical panel upgrades.",
      skills: ["Wiring", "Lighting", "Panel Upgrades", "Troubleshooting"],
      price: 1500,
      availability: "This Week"
    },
    {
      id: 6,
      name: "Priya Rai",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      category: "Yoga Instruction",
      rating: 4.9,
      reviews: 78,
      location: "Budhanilkantha",
      description: "Certified yoga instructor offering private and group sessions for all experience levels.",
      skills: ["Hatha Yoga", "Vinyasa", "Meditation", "Pranayama"],
      price: 900,
      availability: "Mornings"
    }
  ]
  
  // Sample review data
  const reviews = [
    {
      id: 1,
      customer: { name: "Sunil Thapa" },
      rating: 5,
      text: "Ramesh fixed our leaking pipe quickly and professionally. He arrived on time and charged exactly what he quoted. Will definitely call him again.",
      service: "Pipe Repair",
      date: "May 15, 2025"
    },
    {
      id: 2,
      customer: { name: "Maya Gurung" },
      rating: 4.8,
      text: "Priya is an excellent yoga instructor! Her classes are well-structured and she's very attentive to proper alignment. I've improved my flexibility significantly.",
      service: "Private Yoga Sessions",
      date: "June 2, 2025"
    },
    {
      id: 3,
      customer: { name: "Rajan Karki" },
      rating: 5,
      text: "Bijay did an excellent job updating the wiring in our old house. He was very knowledgeable and took the time to explain everything to us.",
      service: "Electrical Wiring",
      date: "June 10, 2025"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-cityserve-orange to-cityserve-yellow bg-clip-text text-transparent">
              Providers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet some of our top-rated service providers. All professionals on Cityसेवा are verified, 
            highly skilled, and ready to help with your next project.
          </p>
        </div>
        
        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, idx) => (
            <CustomerReview key={review.id} review={review} index={idx} />
          ))}
        </div>
        
        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {providers.map((provider, idx) => (
            <ProviderCard key={provider.id} provider={provider} index={idx} />
          ))}
        </div>
        
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground mb-4">
              Looking for something specific? Browse all our verified providers.
            </p>
            <Link 
              href="/auth" 
              className="inline-flex items-center justify-center h-12 px-8 py-2 bg-cityserve-pink text-white rounded-md font-medium hover:bg-cityserve-pink/90 transition-colors"
            >
              Browse All Providers
            </Link>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-pink mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Verified Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-teal mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Service Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-orange mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-green mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
