"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { MetricCard } from "@/components/cards/metric-card"
import { ChecklistCard } from "@/components/cards/checklist-card"
import { ModuleCard } from "@/components/cards/module-card"
import { UpsellModal } from "@/components/modals/upsell-modal"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { useAuth } from "@/lib/auth-context"
import { getUnlockedModules } from "@/lib/modules-config"
import type { ChecklistItem } from "@/lib/types"
import { TrendingUpIcon, UsersIcon, ClockIcon, ActivityIcon } from "@/components/ui/icons"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: "1", label: "Completa tu perfil de organización", completed: true },
    { id: "2", label: "Invita a tu primer miembro del equipo", completed: false },
    { id: "3", label: "Configura tus preferencias de alertas", completed: true },
    { id: "4", label: "Explora los módulos disponibles", completed: false },
    { id: "5", label: "Crea tu primer reporte", completed: false },
  ])

  const modules = getUnlockedModules(user?.plan || "free")

  const handleChecklistToggle = (id: string) => {
    setChecklistItems((items) => items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const handleModuleUnlock = () => {
    setShowUpsellModal(true)
  }

  const handleViewPlans = () => {
    setShowUpsellModal(false)
    router.push("/plans")
  }

  const handleContactSales = () => {
    setShowUpsellModal(false)
    alert("Redirigiendo a contacto con ventas...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Banner */}
        {user?.plan === "free" && (
          <Banner
            title="Estás en el Plan Free"
            description="Actualiza para desbloquear módulos avanzados, límites ampliados y soporte prioritario"
            badge={{ text: "FREE", variant: "free" }}
            action={{
              label: "Ver planes",
              onClick: () => router.push("/plans"),
            }}
            className="mb-8"
          />
        )}

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Registros este mes"
            value="247"
            change={{ value: "+12% vs mes anterior", trend: "up" }}
            icon={<TrendingUpIcon className="w-5 h-5" />}
          />
          <MetricCard
            title="Usuarios activos"
            value="3"
            change={{ value: "Límite: 5 usuarios", trend: "neutral" }}
            icon={<UsersIcon className="w-5 h-5" />}
          />
          <MetricCard
            title="Tiempo de actividad"
            value="14 días"
            change={{ value: "Desde el registro", trend: "neutral" }}
            icon={<ClockIcon className="w-5 h-5" />}
          />
        </div>

        {/* Checklist Card */}
        <div className="mb-8">
          <ChecklistCard title="Primeros pasos con PQP 5.0" items={checklistItems} onToggle={handleChecklistToggle} />
        </div>

        {/* Modules Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Módulos disponibles</h2>
              <p className="text-sm text-gray-600 mt-1">
                {modules.filter((m) => !m.locked).length} de {modules.length} módulos desbloqueados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                locked={module.locked}
                route={module.route}
                requiredPlan={module.requiredPlan}
                onUnlock={handleModuleUnlock}
              />
            ))}
          </div>
        </div>

        {/* Empty State for Activity */}
        <div className="bg-white rounded-lg border p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ActivityIcon className="w-6 h-6" />
              </EmptyMedia>
              <EmptyTitle>No hay actividad reciente</EmptyTitle>
              <EmptyDescription>Comienza a usar los módulos disponibles para ver tu actividad aquí</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>

      {/* Upsell Modal */}
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onViewPlans={handleViewPlans}
        onContactSales={handleContactSales}
      />
    </div>
  )
}
