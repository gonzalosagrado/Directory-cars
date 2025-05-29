import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Car, ArrowLeft } from "lucide-react"

export default function CompanyNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="h-8 w-8 text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa no encontrada</h1>
          <p className="text-gray-600 mb-8">
            Lo sentimos, no pudimos encontrar la empresa que estás buscando. Es posible que haya sido eliminada o que la
            URL sea incorrecta.
          </p>

          <div className="space-y-3">
            <Link href="/rentadoras">
              <Button className="w-full">Ver todas las rentadoras</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
