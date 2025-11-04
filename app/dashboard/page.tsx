"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { ModuleCard } from "@/components/cards/module-card"
import { MetricCard } from "@/components/cards/metric-card"
import { UpsellModal } from "@/components/modals/upsell-modal"
import { useAuth } from "@/lib/auth-context"
import { ActivityIcon, AlertTriangleIcon, TrendingUpIcon, ClockIcon, UsersIcon } from "@/components/ui/icons"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showUpsellModal, setShowUpsellModal] = useState(false)

  const modules = [
    {
      id: "1",
      title: "Registro",
      description: "Información de planta, equipos y calendario",
      icon: <ClockIcon className="w-6 h-6" />,
      route: "/registro",
    },
    {
      id: "2",
      title: "Analítica",
      description: "KPIs en tiempo real, comparativos históricos",
      icon: <TrendingUpIcon className="w-6 h-6" />,
      route: "/analitica",
    },
    {
      id: "3",
      title: "Marketplace",
      description: "Compra de repuestos y servicios",
      icon: <UsersIcon className="w-6 h-6" />,
      route: "/marketplace",
    },
    {
      id: "4",
      title: "Circularidad",
      description: "Gestión y valorización de residuos",
      icon: <ActivityIcon className="w-6 h-6" />,
      route: "/circularidad",
    },
    {
      id: "5",
      title: "Mantenimiento Predictivo",
      description: "IoT, sensores y alertas tempranas",
      icon: <AlertTriangleIcon className="w-6 h-6" />,
      route: "/predictivo",
    },
    {
      id: "6",
      title: "Tablero de Innovación",
      description: "Proyectos conjuntos y benchmarking",
      icon: <ActivityIcon className="w-6 h-6" />,
      route: "/innovacion",
    },
    {
      id: "7",
      title: "Academia PQP",
      description: "Capacitación digital y certificaciones SENA",
      icon: <UsersIcon className="w-6 h-6" />,
      route: "/academia",
    },
    {
      id: "8",
      title: "Soporte Prioritario",
      description: "Mesa técnica 24/7 y brigadas móviles",
      icon: <ActivityIcon className="w-6 h-6" />,
      route: "/soporte",
    },
    {
      id: "9",
      title: "Brigada de Emergencia",
      description: "Activación inmediata operativa",
      icon: <AlertTriangleIcon className="w-6 h-6" />,
      route: "/brigada",
    },
    {
      id: "10",
      title: "Gestión SST y Ambiental",
      description: "Cumplimiento ISO 14001, 45001",
      icon: <ActivityIcon className="w-6 h-6" />,
      route: "/sst",
    },
  ];

  const handleModuleUnlock = () => setShowUpsellModal(true)
  const handleViewPlans = () => {
    setShowUpsellModal(false)
    router.push("/plans")
  }

  const handleContactSales = () => {
    setShowUpsellModal(false)
    alert("Redirigiendo a contacto con ventas...")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Banner superior */}
      <div className="bg-white border-b shadow-sm py-6 px-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estado actual de la planta</h1>
          <p className="text-gray-600">Parada programada en <span className="font-semibold text-green-600">22 días</span></p>
        </div>
        {user?.plan === "free" && (
          <Banner
            title="Plan Free activo"
            description="Actualiza para desbloquear módulos avanzados y soporte técnico completo"
            badge={{ text: "FREE", variant: "free" }}
            action={{
              label: "Ver planes",
              onClick: () => router.push("/plans"),
            }}
          />
        )}
      </div>

      <div className="flex flex-1">
        {/* Sección central */}
        <main className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-y-auto">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              title={mod.title}
              description={mod.description}
              icon={mod.icon}
              route={mod.route}
              locked={false}
              onUnlock={handleModuleUnlock}
            />
          ))}
        </main>

        {/* Lateral derecho */}
        <aside className="w-80 bg-white border-l shadow-sm p-6 flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto">
          <section>
            <h2 className="text-lg font-bold mb-2">⚠️ Alertas</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Sensor de presión fuera de rango</li>
              <li>Mantenimiento pendiente: bomba #3</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">📋 Tareas pendientes</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Actualizar calendario de parada</li>
              <li>Registrar nuevos equipos</li>
              <li>Validar stock de repuestos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">💰 Ahorro proyectado</h2>
            <p className="text-3xl font-bold text-green-600">$ 18.240.000</p>
            <p className="text-sm text-gray-500">vs mes anterior: +6%</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">📊 KPIs</h2>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Disponibilidad"
                value="97%"
                change={{ value: "+1.2%", trend: "up" }}
                icon={<TrendingUpIcon className="w-5 h-5" />}
              />
              <MetricCard
                title="Paradas"
                value="3"
                change={{ value: "-2", trend: "down" }}
                icon={<ClockIcon className="w-5 h-5" />}
              />
            </div>
          </section>
        </aside>
      </div>

      {/* Modal de upgrade */}
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onViewPlans={handleViewPlans}
        onContactSales={handleContactSales}
      />
    </div>
  )
}
