'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function ServiceCard({ provider }) {
  const {
    name,
    service,
    rating,
    reviewCount,
    hourlyRate,
    location,
    avatar,
    verified,
    availability,
    description,
    skills
  } = provider

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <CardContent className="p-6">
        {/* Provider Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-cityserve-pink text-white font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground truncate">{name}</h3>
              {verified && (
                <div className="w-5 h-5 bg-cityserve-teal rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <p className="text-cityserve-pink font-medium">{service}</p>

            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span className="text-cityserve-orange">★</span>
                <span className="font-medium">{rating}</span>
                <span>({reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Pricing and Availability */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <div className="text-2xl font-bold text-foreground">${hourlyRate}</div>
            <div className="text-xs text-muted-foreground">per hour</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-cityserve-green">{availability}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex-1 border-border hover:border-cityserve-pink hover:text-cityserve-pink"
          >
            View Profile
          </Button>
          <Button
            className="flex-1 bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
