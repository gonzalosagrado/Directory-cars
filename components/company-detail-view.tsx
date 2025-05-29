"use client"

import { useState } from "react"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Navigation,
  Bookmark,
  MapIcon,
  Share,
  ChevronDown,
  Car,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RentalCompany } from "@/lib/types"
import Link from "next/link"

interface CompanyDetailViewProps {
  company: RentalCompany
}

export function CompanyDetailView({ company }: CompanyDetailViewProps) {
  const [showAllHours, setShowAllHours] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating)
      const isHalfFilled = i < rating && i >= Math.floor(rating)

      return (
        <Star
          key={i}
          className={`h-5 w-5 ${
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

  const handleDirections = () => {
    // TODO: Abrir Google Maps con direcciones
    window.open(company.gmapsUrl || `https://maps.google.com/?q=${encodeURIComponent(company.address)}`, "_blank")
  }

  const handleCall = () => {
    window.open(`tel:${company.phone}`, "_blank")
  }

  const handleWebsite = () => {
    if (company.website) {
      window.open(company.website, "_blank")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: company.name,
        text: `Mira esta rentadora: ${company.name} en ${company.city}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Filtros superiores estilo GMB */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Clasificación
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Clock className="h-4 w-4 mr-2" />
                Horas
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <MapIcon className="h-4 w-4 mr-2" />
                Todos los filtros
              </Button>
            </div>
            <Link href="/rentadoras">
              <Button variant="ghost" size="sm" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen principal */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
        <img
          src={company.coverImageUrl || "/placeholder.svg?height=400&width=800&query=car rental lot with snow"}
          alt={`${company.name} - Vista principal`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Información principal */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl font-semibold">{company.rating}</span>
              <div className="flex space-x-1">{renderStars(company.rating)}</div>
              <span className="text-gray-600">({company.reviewCount})</span>
            </div>
            <p className="text-gray-600">{company.category}</p>
          </div>

          {/* Tabs de navegación */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview" className="text-blue-600">
                Descripción general
              </TabsTrigger>
              <TabsTrigger value="reviews">Opiniones</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Botones de acción principales */}
              <div className="grid grid-cols-5 gap-4">
                <Button
                  onClick={handleDirections}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto space-y-2"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Navigation className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-center">Indicaciones</span>
                </Button>

                <Button variant="outline" className="flex flex-col items-center p-4 h-auto space-y-2">
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Bookmark className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-xs text-center">Guardar</span>
                </Button>

                <Button variant="outline" className="flex flex-col items-center p-4 h-auto space-y-2">
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <MapIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-xs text-center">Cerca</span>
                </Button>

                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto space-y-2"
                >
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-xs text-center">Enviar al teléfono</span>
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto space-y-2"
                >
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Share className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="text-xs text-center">Compartir</span>
                </Button>
              </div>

              {/* Información de contacto y ubicación */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 py-3 border-b">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{company.address}</p>
                    <p className="text-sm text-gray-600">
                      {company.city}, {company.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-3 border-b">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${company.isOpen ? "text-green-600" : "text-red-600"}`}>
                        {company.isOpen ? "Abierto" : "Cerrado"}
                      </span>
                      <span className="text-gray-600">• Cierra a las 8 p.m.</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllHours(!showAllHours)}
                        className="p-0 h-auto"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${showAllHours ? "rotate-180" : ""}`} />
                      </Button>
                    </div>
                    {showAllHours && (
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Lunes</span>
                          <span>{company.businessHours.monday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Martes</span>
                          <span>{company.businessHours.tuesday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Miércoles</span>
                          <span>{company.businessHours.wednesday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Jueves</span>
                          <span>{company.businessHours.thursday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Viernes</span>
                          <span>{company.businessHours.friday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábado</span>
                          <span>{company.businessHours.saturday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Domingo</span>
                          <span>{company.businessHours.sunday}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {company.website && (
                  <div className="flex items-center space-x-3 py-3 border-b">
                    <Globe className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <Button variant="link" onClick={handleWebsite} className="p-0 h-auto text-blue-600">
                      {company.website.replace("https://", "")}
                    </Button>
                  </div>
                )}

                <div className="flex items-center space-x-3 py-3 border-b">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <Button variant="link" onClick={handleCall} className="p-0 h-auto text-blue-600">
                    {company.phone}
                  </Button>
                </div>
              </div>

              {/* Servicios y características */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Servicios destacados</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {company.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Características adicionales */}
              {company.features && company.features.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Características</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="rounded-full">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Opiniones de clientes</h3>
                    <p className="text-gray-600 mb-4">
                      Esta empresa tiene {company.reviewCount} reseñas con una calificación promedio de {company.rating}{" "}
                      estrellas.
                    </p>
                    <p className="text-sm text-gray-500">Las reseñas detalladas estarán disponibles próximamente.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
