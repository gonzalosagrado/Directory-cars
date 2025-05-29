import Link from "next/link"
import { Car, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">DirectorioAutos</span>
            </div>
            <p className="text-gray-400 mb-4">
              El directorio más completo de empresas de alquiler de autos en Argentina. Encuentra la rentadora perfecta
              para tu próximo viaje con información detallada estilo Google My Business.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Argentina</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">info@directorioautos.com.ar</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/rentadoras" className="hover:text-white transition-colors">
                  Todas las Rentadoras
                </Link>
              </li>
              <li>
                <Link href="/publicar" className="hover:text-white transition-colors">
                  Publicar Empresa
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terminos" className="hover:text-white transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="hover:text-white transition-colors">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} DirectorioAutos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
