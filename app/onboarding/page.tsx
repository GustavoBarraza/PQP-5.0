"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Stepper } from "@/components/layout/stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

const STEPS = [
  { id: "profile", label: "Perfil", description: "Organización" },
  { id: "interests", label: "Intereses", description: "Áreas de enfoque" },
  { id: "alerts", label: "Alertas", description: "Notificaciones" },
]

const SECTORS = ["Tecnología", "Finanzas", "Salud", "Educación", "Retail", "Manufactura", "Servicios", "Otro"]

const EMPLOYEE_RANGES = ["1-10", "11-50", "51-200", "201-500", "500+"]

const INTERESTS = [
  { id: "analytics", label: "Análisis de datos", description: "Visualización y reportes" },
  { id: "automation", label: "Automatización", description: "Flujos de trabajo" },
  { id: "compliance", label: "Cumplimiento", description: "Normativas y auditorías" },
  { id: "security", label: "Seguridad", description: "Protección de datos" },
  { id: "collaboration", label: "Colaboración", description: "Trabajo en equipo" },
  { id: "integration", label: "Integraciones", description: "Conectar herramientas" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1: Organization Profile
  const [sector, setSector] = useState("")
  const [employees, setEmployees] = useState("")
  const [objective, setObjective] = useState("")

  // Step 2: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  // Step 3: Alerts
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [pushAlerts, setPushAlerts] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [frequency, setFrequency] = useState("daily")

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store onboarding data
    const onboardingData = {
      sector,
      employees,
      objective,
      interests: selectedInterests,
      alerts: { emailAlerts, pushAlerts, weeklyReport, frequency },
    }
    localStorage.setItem("onboarding", JSON.stringify(onboardingData))
    localStorage.setItem("onboardingCompleted", "true")

    setIsLoading(false)
    router.push("/dashboard")
  }

  const isStepValid = () => {
    if (currentStep === 1) {
      return sector && employees && objective.trim().length > 0
    }
    if (currentStep === 2) {
      return selectedInterests.length > 0
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configura tu experiencia</h1>
          <p className="text-gray-600">Personaliza PQP 5.0 según las necesidades de tu organización</p>
        </div>

        <Stepper steps={STEPS} currentStep={currentStep} className="mb-12" />

        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Step 1: Organization Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Perfil de organización</h2>
                <p className="text-sm text-gray-600">Cuéntanos sobre tu empresa</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sector">Sector de la industria</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger id="sector" className="w-full">
                      <SelectValue placeholder="Selecciona tu sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees">Número de empleados</Label>
                  <Select value={employees} onValueChange={setEmployees}>
                    <SelectTrigger id="employees" className="w-full">
                      <SelectValue placeholder="Selecciona el rango" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYEE_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="objective">Objetivo principal</Label>
                  <Input
                    id="objective"
                    type="text"
                    placeholder="Ej: Mejorar la eficiencia operativa"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">¿Qué esperas lograr con PQP 5.0?</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Áreas de interés</h2>
                <p className="text-sm text-gray-600">Selecciona los módulos que más te interesan</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Checkbox
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => toggleInterest(interest.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{interest.label}</p>
                      <p className="text-sm text-gray-600">{interest.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedInterests.length > 0 && (
                <p className="text-sm text-gray-600">
                  {selectedInterests.length}{" "}
                  {selectedInterests.length === 1 ? "área seleccionada" : "áreas seleccionadas"}
                </p>
              )}
            </div>
          )}

          {/* Step 3: Alerts */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Preferencias de alertas</h2>
                <p className="text-sm text-gray-600">Configura cómo quieres recibir notificaciones</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Alertas por correo</p>
                    <p className="text-sm text-gray-600">Recibe notificaciones importantes por email</p>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones push</p>
                    <p className="text-sm text-gray-600">Alertas en tiempo real en tu navegador</p>
                  </div>
                  <Switch checked={pushAlerts} onCheckedChange={setPushAlerts} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Reporte semanal</p>
                    <p className="text-sm text-gray-600">Resumen de actividad cada semana</p>
                  </div>
                  <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                </div>

                <div>
                  <Label htmlFor="frequency">Frecuencia de notificaciones</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Tiempo real</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Puedes cambiar esto más tarde en la configuración</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="text-gray-600">
              Atrás
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-gray-600">
                Omitir
              </Button>
              <Button onClick={handleNext} disabled={!isStepValid() || isLoading}>
                {isLoading ? "Guardando..." : currentStep === 3 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
