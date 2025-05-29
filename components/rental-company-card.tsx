"use client"

import { Star, MapPin, MessageCircle, ExternalLink, Car, Clock, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { RentalCompany } from "@/lib/types"

interface RentalCompanyCardProps {
  company: RentalCompany
}

export function RentalCompanyCard({ company }: RentalCompanyCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating)
      const isHalfFilled = i < rating && i >= Math.floor(rating)

      return (
        <Star
          key={i}
          className={`h-4 w-4 ${
            isFilled
              ? "fill-yellow-400 text-yellow-400"
              : isHalfFilled
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-300"
          }`}
        />
      )
    })
  }

  const handleContact = () => {
    // TODO: Implementar lógica de contacto
    if (company.whatsapp) {
      window.open(`https://wa.me/${company.whatsapp}`, "_blank")
    } else if (company.phone) {
      window.open(`tel:${company.phone}`, "_blank")
    }
  }

  return (
    <Card className="border border-slate-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          {/* Sección Superior: Logo e Información Principal */}
          <div className="flex items-start space-x-4 mb-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <Car className="h-6 w-6 text-slate-400" />
              )}
            </div>

            {/* Información de la Empresa */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{company.name}</h3>
              <div className="flex items-center text-sm text-slate-600 mb-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {company.city}, {company.province}
                </span>
              </div>
              <p className="text-xs text-slate-500">{company.category}</p>
            </div>
          </div>

          {/* Sección de Calificación */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg font-semibold text-slate-900">{company.rating}</span>
            <div className="flex space-x-1">{renderStars(company.rating)}</div>
            <span className="text-sm text-slate-500">({company.reviewCount})</span>
          </div>

          {/* Estado y Horarios */}
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className={`text-sm font-medium ${company.isOpen ? "text-green-600" : "text-red-600"}`}>
              {company.isOpen ? "Abierto" : "Cerrado"}
            </span>
            <span className="text-sm text-slate-500">• Cierra a las 8 p.m.</span>
          </div>

          {/* Sección Servicios Destacados */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-900 mb-2">Servicios destacados:</p>
            <div className="flex flex-wrap gap-2">
              {company.services.slice(0, 3).map((service, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs px-3 py-1"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="mb-4 space-y-1">
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="h-3 w-3 mr-2" />
              <span>{company.phone}</span>
            </div>
            <div className="text-sm text-slate-600 truncate">{company.address}</div>
          </div>

          {/* Botones de Acción */}
          <div className="flex space-x-3">
            <Button onClick={handleContact} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contactar
            </Button>
            <Link href={`/empresa/${company.id}`} className="flex-1">
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
