"use client"

import { Navbar } from "@/components/navbar"
import { HeroSearch } from "@/components/hero-search"
import { RentalCompanyCard } from "@/components/rental-company-card"
import { Footer } from "@/components/footer"
import { Car, Star, MapPin, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { getCompaniesWithFilters } from "@/lib/supabase-queries"
import type { RentalCompany } from "@/lib/types"

export default function HomePage() {
  const [featuredCompanies, setFeaturedCompanies] = useState<RentalCompany[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedCompanies() {
      setLoading(true)
      try {
        console.log("Cargando empresas destacadas...")
        // Obtener las 8 empresas mejor calificadas
        const companies = await getCompaniesWithFilters({
          sortBy: "rating",
        })
        console.log("Empresas obtenidas:", companies)
        setFeaturedCompanies(companies.slice(0, 8))
      } catch (error) {
        console.error("Error cargando empresas:", error)
        // Si hay error, mostrar datos mock como fallback
        setFeaturedCompanies([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedCompanies()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSearch />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rentadoras Destacadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las mejores empresas de alquiler de autos en Argentina con información detallada y calificaciones
            reales
          </p>
        </div>

        {/* Cuadrícula de Tarjetas */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Cargando rentadoras destacadas...</span>
          </div>
        ) : featuredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCompanies.map((company) => (
              <RentalCompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No se pudieron cargar las empresas destacadas</p>
            <p className="text-gray-400 text-sm">Verifica la conexión con la base de datos</p>
          </div>
        )}

        {/* Sección de Información */}
        <div className="mt-16 bg-white rounded-lg p-8 border border-slate-200">
          <h3 className="text-2xl font-semibold mb-4">¿Por qué elegir DirectorioAutos?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Información Completa</h4>
              <p className="text-gray-600 text-sm">
                Datos detallados de cada rentadora incluyendo horarios, contacto y servicios
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Calificaciones Reales</h4>
              <p className="text-gray-600 text-sm">Reseñas y calificaciones verificadas de clientes reales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Cobertura Nacional</h4>
              <p className="text-gray-600 text-sm">
                Rentadoras en todas las provincias y destinos turísticos de Argentina
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
