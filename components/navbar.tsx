"use client"

import Link from "next/link"
import { Car, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">DirectorioAutos</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Inicio
            </Link>
            <Link href="/rentadoras" className="text-gray-600 hover:text-gray-900 transition-colors">
              Rentadoras
            </Link>
            <Link href="/publicar" className="text-gray-600 hover:text-gray-900 transition-colors">
              Publicar Empresa
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost">Iniciar Sesión</Button>
            <Button className="bg-gray-900 hover:bg-gray-800">Registrarse</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Inicio
              </Link>
              <Link href="/rentadoras" className="text-gray-600 hover:text-gray-900 transition-colors">
                Rentadoras
              </Link>
              <Link href="/publicar" className="text-gray-600 hover:text-gray-900 transition-colors">
                Publicar Empresa
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  Iniciar Sesión
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 justify-start">Registrarse</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
