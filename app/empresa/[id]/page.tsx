"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CompanyDetailView } from "@/components/company-detail-view"
import { getCompanyById } from "@/lib/supabase-queries"
import { useEffect, useState } from "react"
import type { RentalCompany } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface CompanyDetailPageProps {
  params: {
    id: string
  }
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const [company, setCompany] = useState<RentalCompany | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadCompany() {
      setLoading(true)
      const companyData = await getCompanyById(params.id)

      if (!companyData) {
        setNotFound(true)
      } else {
        setCompany(companyData)
      }

      setLoading(false)
    }

    loadCompany()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Cargando información de la empresa...</span>
        </div>
        <Footer />
      </div>
    )
  }

  if (notFound || !company) {
    notFound()
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CompanyDetailView company={company} />
      <Footer />
    </div>
  )
}
