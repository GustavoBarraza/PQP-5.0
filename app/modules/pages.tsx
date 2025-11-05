"use client"

import { ModuleCard } from "@/components/cards/module-card"
import { Users, TrendingUp, Database, Cog } from "lucide-react"

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 text-center">
        Catálogo de Módulos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Colaboración"
          description="Gestiona equipos, chat en tiempo real y permisos por rol."
          icon={<Users className="w-6 h-6" />}
          route="/modules/collaboration"
          requiredPlan="Essential"
        />

        <ModuleCard
          title="Calculadora ROI"
          description="Evalúa el retorno de inversión de PQP 5.0."
          icon={<TrendingUp className="w-6 h-6" />}
          route="/roi"
        />

        <ModuleCard
          title="Gestión de Datos"
          description="Monitorea, limpia y analiza los datos de tu planta."
          icon={<Database className="w-6 h-6" />}
          route="/modules/data"
          locked
          requiredPlan="Advanced"
        />

        <ModuleCard
          title="Automatización"
          description="Configura flujos automáticos para tus procesos."
          icon={<Cog className="w-6 h-6" />}
          route="/modules/automation"
        />
      </div>
    </div>
  )
}
