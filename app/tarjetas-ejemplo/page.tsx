import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RentalCompanyCard } from "@/components/rental-company-card"
import { mockCompanies } from "@/lib/mock-data"

export default function TarjetasEjemploPage() {
  // Mostrar solo las primeras 6 empresas como ejemplo
  const exampleCompanies = mockCompanies.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ejemplo de Tarjetas de Empresas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Diseño de tarjetas responsive y moderno para mostrar información de empresas de alquiler de autos
          </p>
        </div>

        {/* Cuadrícula Responsive de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleCompanies.map((company) => (
            <RentalCompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* Información Técnica */}
        <div className="mt-12 bg-white rounded-lg p-6 border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Características del Componente</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              • <strong>Responsive:</strong> Se adapta a diferentes tamaños de pantalla (1 columna en móvil, 2 en
              tablet, 3 en desktop)
            </li>
            <li>
              • <strong>Reutilizable:</strong> Acepta props dinámicas para mostrar cualquier empresa
            </li>
            <li>
              • <strong>Interactivo:</strong> Botones funcionales con efectos hover y estados
            </li>
            <li>
              • <strong>Accesible:</strong> Estructura semántica y contraste adecuado
            </li>
            <li>
              • <strong>Moderno:</strong> Diseño limpio siguiendo las mejores prácticas de UI/UX
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
