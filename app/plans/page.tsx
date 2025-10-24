"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckIcon, XIcon } from "@/components/ui/icons"

const PLANS = [
  {
    id: "free",
    name: "Free",
    badge: "free" as const,
    price: "Gratis (90 días)",
    period: "siempre gratis",
    description: "Perfecto para empezar y explorar PQP 5.0",
    cta: "Plan actual",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Hasta 500 registros mensuales",
      "Hasta 5 usuarios",
      "2 módulos básicos",
      "Almacenamiento: 1 GB",
      "Soporte por email (48h)",
      "Reportes básicos",
    ],
  },
  {
    id: "essential",
    name: "Essential",
    badge: "essential" as const,
    price: "$22.500 / año",
    period: "por mes",
    description: "Para equipos pequeños que necesitan más funcionalidad",
    cta: "Comenzar prueba",
    ctaVariant: "default" as const,
    popular: true,
    features: [
      "Almacenamiento: 50 GB",
      "Auditoria HSE anual",
      "Automatización básica",
      "Hasta 5,000 registros mensuales",
      "Hasta 15 usuarios",
      "Integraciones API",
      "Mantenimiento Predictivo básico",
      "Reportes avanzados",
      "Soporte prioritario (24h)",
      "soporte horario laboral",
      "Todos los módulos incluidos", 
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    badge: "advanced" as const,
    price: "$60.000 / año",
    description: "Para empresas en crecimiento con necesidades avanzadas",
    cta: "Comenzar prueba",
    ctaVariant: "default" as const,
    popular: false,
    features: [
      "6 intervenciones brigadas/año",
      "50 sensores Iot",
      "Almacenamiento: 500 GB",
      "Análisis predictivo",
      "Automatización avanzada",
      "Cumplimiento y auditorías",
      "Dashboard predictivo tiempo real",
      "Hasta 25,000 registros mensuales",
      "Integraciones ilimitadas",
      "módulos + Premium",
      "Reportes personalizados",
      "Soporte prioritario (2h)",
      "Usuarios ilimitados",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "enterprise" as const,
    price: "Personalizado",
    period: "contactar ventas",
    description: "Solución completa para grandes organizaciones",
    cta: "Contactar ventas",
    ctaVariant: "default" as const,
    popular: false,
    features: [
      "Almacenamiento ilimitado",
      "Automatización empresarial",
      "Brigadas 24/7 y soporte dedicado",
      "Capacitación personalizada",
      "Gestor de cuenta dedicado",
      "Gemelos digitales",
      "IA y Machine Learning",
      "Integraciones ERP",
      "Integraciones personalizadas",
      "Registros ilimitados",
      "Reportes a medida",
      "SLA garantizado",
      "Soporte dedicado 24/7",
      "Todos los módulos + Personalizados",
      "Usuarios ilimitados",
    ],
  },
]

const COMPARISON_FEATURES = [
  {
    category: "Límites de uso",
    features: [
      { name: "Registros mensuales", free: "500", essential: "5,000", advanced: "25,000", enterprise: "Ilimitado" },
      { name: "Usuarios", free: "5", essential: "15", advanced: "Ilimitado", enterprise: "Ilimitado" },
      { name: "Almacenamiento", free: "1 GB", essential: "50 GB", advanced: "500 GB", enterprise: "Ilimitado" },
    ],
  },
  {
    category: "Módulos",
    features: [
      { name: "Análisis básico", free: true, essential: true, advanced: true, enterprise: true },
      { name: "Alertas inteligentes", free: true, essential: true, advanced: true, enterprise: true },
      { name: "Automatización", free: false, essential: true, advanced: true, enterprise: true },
      { name: "Colaboración", free: false, essential: true, advanced: true, enterprise: true },
      { name: "Cumplimiento", free: false, essential: false, advanced: true, enterprise: true },
      { name: "Reportes premium", free: false, essential: false, advanced: true, enterprise: true },
      { name: "Análisis predictivo", free: false, essential: false, advanced: true, enterprise: true },
      { name: "Módulos personalizados", free: false, essential: false, advanced: false, enterprise: true },
    ],
  },
  {
    category: "Soporte",
    features: [
      { name: "Email (48h)", free: true, essential: false, advanced: false, enterprise: false },
      { name: "Prioritario (24h)", free: false, essential: true, advanced: false, enterprise: false },
      { name: "Prioritario (2h)", free: false, essential: false, advanced: true, enterprise: false },
      { name: "Dedicado 24/7", free: false, essential: false, advanced: false, enterprise: true },
      { name: "Gestor de cuenta", free: false, essential: false, advanced: false, enterprise: true },
    ],
  },
  {
    category: "Integraciones",
    features: [
      { name: "API básica", free: true, essential: true, advanced: true, enterprise: true },
      { name: "Webhooks", free: false, essential: true, advanced: true, enterprise: true },
      { name: "Integraciones ilimitadas", free: false, essential: false, advanced: true, enterprise: true },
      { name: "Integraciones personalizadas", free: false, essential: false, advanced: false, enterprise: true },
    ],
  },
]

export default function PlansPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      alert("Ya estás en el plan Free")
    } else if (planId === "enterprise") {
      alert("Redirigiendo a contacto con ventas...")
    } else {
      alert(`Iniciando prueba del plan ${planId}...`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Elige el plan perfecto para tu equipo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comienza gratis y actualiza cuando necesites más funcionalidad. Todos los planes incluyen 14 días de prueba
            gratuita.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === "monthly" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === "annual" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Ahorra 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border-2 p-6 flex flex-col ${
                plan.popular ? "border-primary shadow-lg scale-105" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <Badge variant={plan.badge}>{plan.name.toUpperCase()}</Badge>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.id !== "enterprise" && plan.id !== "free" && billingPeriod === "annual" && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${Number.parseInt(plan.price.replace("$", "")) * 12}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{plan.period}</p>
                {billingPeriod === "annual" && plan.id !== "enterprise" && plan.id !== "free" && (
                  <p className="text-sm text-success font-medium mt-1">
                    ${Math.round(Number.parseInt(plan.price.replace("$", "")) * 12 * 0.8)}/año (ahorra 20%)
                  </p>
                )}
              </div>

              <Button
                onClick={() => handleSelectPlan(plan.id)}
                variant={plan.ctaVariant}
                className="w-full mb-6"
                disabled={plan.id === "free"}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparación detallada de planes</h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Característica</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center">Essential</TableHead>
                  <TableHead className="text-center">Advanced</TableHead>
                  <TableHead className="text-center">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARISON_FEATURES.map((category) => (
                  <>
                    <TableRow key={category.category} className="bg-gray-50">
                      <TableCell colSpan={5} className="font-semibold text-gray-900">
                        {category.category}
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature, index) => (
                      <TableRow key={`${category.category}-${index}`}>
                        <TableCell className="font-medium text-gray-700">{feature.name}</TableCell>
                        <TableCell className="text-center">
                          {typeof feature.free === "boolean" ? (
                            feature.free ? (
                              <CheckIcon className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700">{feature.free}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.essential === "boolean" ? (
                            feature.essential ? (
                              <CheckIcon className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700">{feature.essential}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.advanced === "boolean" ? (
                            feature.advanced ? (
                              <CheckIcon className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700">{feature.advanced}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.enterprise === "boolean" ? (
                            feature.enterprise ? (
                              <CheckIcon className="w-5 h-5 text-success mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-700">{feature.enterprise}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes preguntas?</h2>
          <p className="text-gray-600 mb-6">
            Nuestro equipo está aquí para ayudarte a elegir el plan perfecto para tu organización.
          </p>
          <Button variant="outline" onClick={() => alert("Redirigiendo a contacto...")}>
            Contactar con ventas
          </Button>
        </div>
      </div>
    </div>
  )
}
