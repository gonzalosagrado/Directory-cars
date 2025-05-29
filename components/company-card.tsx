"use client"

import { Star, MapPin, MessageCircle, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RentalCompany } from "@/lib/types"

interface CompanyCardProps {
  company: RentalCompany
}

export function CompanyCard({ company }: CompanyCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={company.imageUrl || "/placeholder.svg?height=200&width=300&query=car rental office"}
            alt={`${company.name} - Oficina`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{company.rating}</span>
              <div className="flex">{renderStars(company.rating)}</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {company.city}, {company.province}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Servicios destacados:</p>
            <div className="flex flex-wrap gap-1">
              {company.services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-1" />
              Contactar
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-1" />
              Ver Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
