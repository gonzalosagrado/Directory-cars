import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CompanyCard } from "@/components/company-card"
import { mockCompanies } from "@/lib/mock-data"

export default function SearchResultsPage() {
  // TODO: Implementar búsqueda real con Supabase
  // const searchTerm = searchParams.q || ''
  // const filteredCompanies = await searchCompanies(searchTerm)

  const searchTerm = "Buenos Aires" // Ejemplo estático
  const filteredCompanies = mockCompanies.slice(0, 6) // Ejemplo estático

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resultados de Búsqueda para: "{searchTerm}"</h1>
          <p className="text-gray-600">
            Encontramos {filteredCompanies.length} rentadoras que coinciden con tu búsqueda
          </p>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron resultados para tu búsqueda.</p>
            <p className="text-gray-400 mt-2">Funcionalidad de búsqueda en desarrollo.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
