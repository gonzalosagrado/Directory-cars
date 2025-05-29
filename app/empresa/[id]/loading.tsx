import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function CompanyDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        {/* Filtros superiores skeleton */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Imagen principal skeleton */}
        <Skeleton className="aspect-video w-full" />

        {/* Contenido principal skeleton */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <Skeleton className="h-8 w-64 mb-2" />
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="h-6 w-8" />
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5" />
                  ))}
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
              <Skeleton className="h-5 w-48" />
            </div>

            {/* Tabs skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />

              {/* Botones de acción skeleton */}
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>

              {/* Información de contacto skeleton */}
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 py-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
