"use client"

// Actualizar la importación para usar el nuevo componente
import { RentalCompanyCard } from "./rental-company-card"
import type { RentalCompany } from "@/lib/types"

interface ProvinceSectionProps {
  provinceName: string
  companies: RentalCompany[]
}

export function ProvinceSection({ provinceName, companies }: ProvinceSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rentadoras en {provinceName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <RentalCompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  )
}
