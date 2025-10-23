import { ChartBarIcon, BellIcon, ShieldIcon, UsersIcon, CogIcon, FileTextIcon } from "@/components/ui/icons"
import type { Module } from "./types"

export const MODULES_CONFIG: Module[] = [
  {
    id: "analytics",
    title: "Análisis Avanzado",
    description: "Visualizaciones interactivas y reportes personalizados",
    icon: <ChartBarIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/analytics",
    requiredPlan: "free",
  },
  {
    id: "automation",
    title: "Automatización",
    description: "Flujos de trabajo automatizados y triggers inteligentes",
    icon: <CogIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/automation",
    requiredPlan: "essential",
  },
  {
    id: "compliance",
    title: "Cumplimiento",
    description: "Auditorías, normativas y gestión de riesgos",
    icon: <ShieldIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/compliance",
    requiredPlan: "advanced",
  },
  {
    id: "collaboration",
    title: "Colaboración",
    description: "Espacios de trabajo compartidos y comunicación en equipo",
    icon: <UsersIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/collaboration",
    requiredPlan: "essential",
  },
  {
    id: "alerts",
    title: "Alertas Inteligentes",
    description: "Notificaciones personalizadas y monitoreo en tiempo real",
    icon: <BellIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/alerts",
    requiredPlan: "free",
  },
  {
    id: "reports",
    title: "Reportes Premium",
    description: "Informes ejecutivos y exportación avanzada",
    icon: <FileTextIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/reports",
    requiredPlan: "advanced",
  },
]

export function getModuleById(id: string): Module | undefined {
  return MODULES_CONFIG.find((module) => module.id === id)
}

export function getUnlockedModules(plan: string): Module[] {
  const planHierarchy = ["free", "essential", "advanced", "enterprise"]
  const userPlanIndex = planHierarchy.indexOf(plan)

  return MODULES_CONFIG.map((module) => {
    const modulePlanIndex = planHierarchy.indexOf(module.requiredPlan)
    return {
      ...module,
      locked: modulePlanIndex > userPlanIndex,
    }
  })
}
