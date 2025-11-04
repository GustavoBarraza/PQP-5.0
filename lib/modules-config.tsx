// === MODULES CONFIGURATION ===
// Central configuration for all PQP 5.0 modules with routing, icons, and permissions

import {
  ChartBarIcon,
  BellIcon,
  ShieldIcon,
  UsersIcon,
  CogIcon,
  FileTextIcon,
  Calendar,
  Building2,
  Headphones,
  Network,
  Recycle,
} from "@/components/ui/icons";
import type { Module } from "./types";

export const MODULES_CONFIG: Module[] = [
  {
    id: "shutdown-planning",
    title: "Planeación de Paradas",
    description: "Gestión inteligente de mantenimiento y cronogramas",
    icon: <Calendar className="w-6 h-6" />,
    locked: false,
    route: "/modules/shutdown-planning",
    requiredPlan: "free",
  },
  {
    id: "analytics",
    title: "Análisis Avanzado",
    description: "Visualizaciones interactivas y reportes de ROI",
    icon: <ChartBarIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/analytics",
    requiredPlan: "free",
  },
  {
    id: "contractors",
    title: "Contratistas y Proveedores",
    description: "Gestión de empresas certificadas y HSE",
    icon: <Building2 className="w-6 h-6" />,
    locked: false,
    route: "/modules/contractors",
    requiredPlan: "free",
  },
  {
    id: "circularidad",
    title: "Economía Circular",
    description: "Gestión y valorización de residuos",
    icon: <Recycle className="w-6 h-6" />,
    locked: false,
    route: "/modules/circularidad",
    requiredPlan: "free",
  },
  {
    id: "hse",
    title: "HSE & Zero Accidentes",
    description: "Seguridad, salud ocupacional y cumplimiento",
    icon: <ShieldIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/hse",
    requiredPlan: "free",
  },
  {
    id: "alerts",
    title: "Alertas Inteligentes",
    description: "Notificaciones personalizadas en tiempo real",
    icon: <BellIcon className="w-6 h-6" />,
    locked: false,
    route: "/modules/alerts",
    requiredPlan: "free",
  },
  {
    id: "support",
    title: "Soporte y Capacitación",
    description: "Centro de ayuda y cursos certificados",
    icon: <Headphones className="w-6 h-6" />,
    locked: false,
    route: "/modules/support",
    requiredPlan: "free",
  },
  {
    id: "collective-impact",
    title: "Impacto Colectivo",
    description: "Red colaborativa y métricas de sostenibilidad",
    icon: <Network className="w-6 h-6" />,
    locked: false,
    route: "/modules/collective-impact",
    requiredPlan: "free",
  },
  {
    id: "automation",
    title: "Automatización",
    description: "Flujos de trabajo automatizados y triggers",
    icon: <CogIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/automation",
    requiredPlan: "essential",
  },
  {
    id: "collaboration",
    title: "Colaboración",
    description: "Espacios compartidos y comunicación en equipo",
    icon: <UsersIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/collaboration",
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
    id: "reports",
    title: "Reportes Premium",
    description: "Informes ejecutivos y exportación avanzada",
    icon: <FileTextIcon className="w-6 h-6" />,
    locked: true,
    route: "/modules/reports",
    requiredPlan: "advanced",
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES_CONFIG.find((module) => module.id === id);
}

export function getUnlockedModules(plan: string): Module[] {
  const planHierarchy = ["free", "essential", "advanced", "enterprise"];
  const userPlanIndex = planHierarchy.indexOf(plan);

  return MODULES_CONFIG.map((module) => {
    const modulePlanIndex = planHierarchy.indexOf(module.requiredPlan);
    return {
      ...module,
      locked: modulePlanIndex > userPlanIndex,
    };
  });
}
