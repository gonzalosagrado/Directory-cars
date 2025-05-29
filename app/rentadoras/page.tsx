"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RentalCompanyCard } from "@/components/rental-company-card"
import { HeroSearch } from "@/components/hero-search"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { searchCompanies, getCompaniesWithFilters, getAvailableProvinces } from "@/lib/supabase-queries"
import type { RentalCompany } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function RentadorasPage() {
  const [companies, setCompanies] = useState<RentalCompany[]>([])
  const [provinces, setProvinces] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    province: "all",
    minRating: 0,
    sortBy: "rating" as "rating" | "review_count" | "name",
  })

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  // Cargar provincias disponibles al montar el componente
  useEffect(() => {
    async function loadProvinces() {
      const availableProvinces = await getAvailableProvinces()
      setProvinces(availableProvinces)
    }
    loadProvinces()
  }, [])

  // Cargar empresas cuando cambian los filtros o la búsqueda
  useEffect(() => {
    async function loadCompanies() {
      setLoading(true)

      let results: RentalCompany[] = []

      if (searchQuery) {
        // Si hay término de búsqueda, usar la función de búsqueda
        results = await searchCompanies(searchQuery)
      } else {
        // Si no hay búsqueda, usar filtros
        results = await getCompaniesWithFilters(filters)
      }

      setCompanies(results)
      setLoading(false)
    }

    loadCompanies()
  }, [searchQuery, filters])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: filterType === "minRating" ? Number.parseFloat(value) : value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      province: "all",
      minRating: 0,
      sortBy: "rating",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSearch />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Resultados para "${searchQuery}"` : "Todas las Rentadoras"}
            </h1>
            <p className="text-gray-600">
              {loading ? "Cargando..." : `Encontramos ${companies.length} empresas de alquiler de autos`}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
              <Select value={filters.province} onValueChange={(value) => handleFilterChange("province", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las provincias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las provincias</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Calificación mínima</label>
              <Select
                value={filters.minRating.toString()}
                onValueChange={(value) => handleFilterChange("minRating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier calificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Cualquier calificación</SelectItem>
                  <SelectItem value="4">4+ estrellas</SelectItem>
                  <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                  <SelectItem value="5">5 estrellas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor calificación</SelectItem>
                  <SelectItem value="review_count">Más reseñas</SelectItem>
                  <SelectItem value="name">Alfabético</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Cargando rentadoras...</span>
          </div>
        ) : companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map((company) => (
              <RentalCompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery
                ? `No se encontraron resultados para "${searchQuery}"`
                : "No se encontraron rentadoras con los filtros seleccionados"}
            </p>
            <Button onClick={clearFilters} variant="outline">
              Ver todas las rentadoras
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
