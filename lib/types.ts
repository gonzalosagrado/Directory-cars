// TODO: Estos tipos serán utilizados para la integración con Supabase
export interface RentalCompany {
  id: string
  name: string
  city: string
  province: string
  rating: number
  reviewCount: number
  logoUrl?: string
  coverImageUrl?: string
  address: string
  phone: string
  website?: string
  email?: string
  whatsapp?: string
  gmapsUrl: string
  services: string[]
  description?: string
  businessHours: BusinessHours
  isOpen?: boolean
  category: string
  priceRange?: string
  features?: string[]
}

export interface BusinessHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface Province {
  id: string
  name: string
  companies: RentalCompany[]
}
