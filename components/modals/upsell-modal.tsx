"use client"
import { XIcon, CheckIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  onViewPlans: () => void
  onContactSales: () => void
}

export function UpsellModal({ isOpen, onClose, onViewPlans, onContactSales }: UpsellModalProps) {
  if (!isOpen) return null

  const benefits = [
    {
      title: "Acceso completo a todos los módulos",
      description: "Desbloquea análisis avanzados, reportes personalizados y más",
    },
    {
      title: "Límites ampliados",
      description: "Hasta 10,000 registros mensuales y almacenamiento ilimitado",
    },
    {
      title: "Soporte prioritario",
      description: "Respuesta en menos de 2 horas y gestor de cuenta dedicado",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Desbloquea todo el potencial de PQP</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" type="button">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Actualiza tu plan para acceder a funcionalidades avanzadas que te ayudarán a escalar tu negocio más rápido.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-light rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-gray-700">
              <strong>Oferta especial:</strong> Obtén 20% de descuento en tu primer año al actualizar ahora.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onViewPlans} className="flex-1">
              Ver planes
            </Button>
            <Button onClick={onContactSales} variant="outline" className="flex-1 bg-transparent">
              Hablar con ventas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
