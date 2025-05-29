import { supabase } from "./supabase-client"
import type { RentalCompany } from "./types"

// Función para buscar empresas por término de búsqueda
export async function searchCompanies(searchTerm = ""): Promise<RentalCompany[]> {
  try {
    let query = supabase.from("rental_companies").select(`
        *,
        business_hours (*)
      `)

    // Si hay término de búsqueda, filtrar por nombre o ciudad
    if (searchTerm.trim()) {
      query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
    }

    const { data, error } = await query.order("rating", { ascending: false })

    if (error) {
      console.error("Error buscando empresas:", error)
      return []
    }

    return data?.map(transformCompanyData) || []
  } catch (error) {
    console.error("Error en searchCompanies:", error)
    return []
  }
}

// Función para obtener empresas con filtros
export async function getCompaniesWithFilters({
  province,
  minRating,
  sortBy = "rating",
}: {
  province?: string
  minRating?: number
  sortBy?: "rating" | "review_count" | "name"
}): Promise<RentalCompany[]> {
  try {
    let query = supabase.from("rental_companies").select(`
        *,
        business_hours (*)
      `)

    // Aplicar filtros
    if (province && province !== "all") {
      query = query.eq("province", province)
    }

    if (minRating) {
      query = query.gte("rating", minRating)
    }

    // Aplicar ordenamiento
    const ascending = sortBy === "name"
    query = query.order(sortBy, { ascending })

    const { data, error } = await query

    if (error) {
      console.error("Error obteniendo empresas con filtros:", error)
      return []
    }

    return data?.map(transformCompanyData) || []
  } catch (error) {
    console.error("Error en getCompaniesWithFilters:", error)
    return []
  }
}

// Función para obtener todas las provincias disponibles
export async function getAvailableProvinces(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("rental_companies").select("province").order("province")

    if (error) {
      console.error("Error obteniendo provincias:", error)
      return []
    }

    // Obtener provincias únicas
    const provinces = [...new Set(data?.map((item) => item.province) || [])]
    return provinces
  } catch (error) {
    console.error("Error en getAvailableProvinces:", error)
    return []
  }
}

// Función para obtener una empresa por ID
export async function getCompanyById(id: string): Promise<RentalCompany | null> {
  try {
    const { data, error } = await supabase
      .from("rental_companies")
      .select(`
        *,
        business_hours (*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error obteniendo empresa por ID:", error)
      return null
    }

    return data ? transformCompanyData(data) : null
  } catch (error) {
    console.error("Error en getCompanyById:", error)
    return null
  }
}

// Función auxiliar para transformar los datos de Supabase al formato esperado
function transformCompanyData(data: any): RentalCompany {
  const businessHours = data.business_hours?.[0] || {}

  return {
    id: data.id,
    name: data.name,
    city: data.city,
    province: data.province,
    rating: Number.parseFloat(data.rating),
    reviewCount: data.review_count,
    logoUrl: data.logo_url,
    coverImageUrl: data.cover_image_url,
    address: data.address,
    phone: data.phone,
    website: data.website,
    email: data.email,
    whatsapp: data.whatsapp,
    gmapsUrl: data.gmaps_url || `https://maps.google.com/?q=${encodeURIComponent(data.address)}`,
    services: data.services || [],
    description: data.description,
    isOpen: data.is_open,
    category: data.category,
    priceRange: data.price_range,
    features: data.features || [],
    businessHours: {
      monday: businessHours.monday || "8:00 - 20:00",
      tuesday: businessHours.tuesday || "8:00 - 20:00",
      wednesday: businessHours.wednesday || "8:00 - 20:00",
      thursday: businessHours.thursday || "8:00 - 20:00",
      friday: businessHours.friday || "8:00 - 20:00",
      saturday: businessHours.saturday || "9:00 - 18:00",
      sunday: businessHours.sunday || "Cerrado",
    },
  }
}
