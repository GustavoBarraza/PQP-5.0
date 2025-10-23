"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CogIcon, LockIcon, CheckIcon } from "@/components/ui/icons"

export default function AutomationModulePage() {
  const router = useRouter()

  const features = [
    "Flujos de trabajo automatizados",
    "Triggers inteligentes basados en eventos",
    "Integraciones con herramientas externas",
    "Plantillas de automatización predefinidas",
    "Editor visual de flujos",
    "Ejecución programada de tareas",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
            <CogIcon className="w-8 h-8 text-gray-400" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
              <LockIcon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <Badge variant="outline" className="mb-4">
            Requiere plan Essential o superior
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Automatización</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimiza tus procesos con flujos de trabajo automatizados y triggers inteligentes
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Funcionalidades incluidas</CardTitle>
            <CardDescription>Todo lo que obtienes al desbloquear este módulo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Listo para automatizar?</h2>
          <p className="text-gray-600 mb-6">Actualiza a un plan Essential o superior para acceder a este módulo</p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => router.push("/plans")} size="lg">
              Ver planes
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="outline" size="lg">
              Volver al dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
