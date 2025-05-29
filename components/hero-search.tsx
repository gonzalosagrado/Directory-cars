"use client"

import type React from "react"

import { MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useRouter } from "next/navigation"

const popularDestinations = ["Bariloche", "Mendoza", "Córdoba", "Salta", "Ushuaia", "Buenos Aires"]

export function HeroSearch() {
  const [destination, setDestination] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    if (!destination.trim()) return

    setIsSearching(true)

    // Redirigir a la página de resultados con el término de búsqueda
    const searchParams = new URLSearchParams({
      q: destination.trim(),
    })

    router.push(`/rentadoras?${searchParams.toString()}`)
    setIsSearching(false)
  }

  const handleDestinationClick = (dest: string) => {
    setDestination(dest)

    // Buscar automáticamente cuando se hace clic en un destino popular
    const searchParams = new URLSearchParams({
      q: dest,
    })

    router.push(`/rentadoras?${searchParams.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra el Auto de Alquiler Perfecto</h1>
          <p className="text-xl mb-8 text-blue-100">
            Conectamos con las mejores rentadoras locales para tu próximo viaje
          </p>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <label htmlFor="destination_query" className="sr-only">
                ¿A dónde vas a viajar?
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="destination_query"
                  name="destination_query"
                  placeholder="¿A dónde vas a viajar?"
                  className="pl-10 h-12 text-gray-900 text-lg"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
                disabled={!destination.trim() || isSearching}
              >
                <Search className="h-5 w-5 mr-2" />
                {isSearching ? "Buscando..." : "Buscar Autos"}
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-blue-100 mb-4">Destinos populares:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularDestinations.map((destination) => (
                <Badge
                  key={destination}
                  variant="secondary"
                  className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer px-3 py-1 text-sm transition-colors"
                  onClick={() => handleDestinationClick(destination)}
                >
                  {destination}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
