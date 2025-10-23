"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Checkbox } from "@/components/ui/checkbox"

const SECTORS = ["Tecnología", "Finanzas", "Salud", "Educación", "Retail", "Manufactura", "Servicios", "Otro"]
const EMPLOYEE_RANGES = ["1-10", "11-50", "51-200", "201-500", "500+"]

const INTERESTS = [
  { id: "analytics", label: "Análisis de datos" },
  { id: "automation", label: "Automatización" },
  { id: "compliance", label: "Cumplimiento" },
  { id: "security", label: "Seguridad" },
  { id: "collaboration", label: "Colaboración" },
  { id: "integration", label: "Integraciones" },
]

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)

  // Profile data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    company: "",
  })

  // Organization data
  const [orgData, setOrgData] = useState({
    sector: "",
    employees: "",
    objective: "",
  })

  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Alert preferences
  const [alertPreferences, setAlertPreferences] = useState({
    emailAlerts: true,
    pushAlerts: false,
    weeklyReport: true,
    frequency: "daily",
  })

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user")
    const onboardingData = localStorage.getItem("onboarding")

    if (userData) {
      const user = JSON.parse(userData)
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        company: user.company || "",
      })
    }

    if (onboardingData) {
      const onboarding = JSON.parse(onboardingData)
      setOrgData({
        sector: onboarding.sector || "",
        employees: onboarding.employees || "",
        objective: onboarding.objective || "",
      })
      setSelectedInterests(onboarding.interests || [])
      if (onboarding.alerts) {
        setAlertPreferences(onboarding.alerts)
      }
    }
  }, [])

  const handleSaveProfile = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    localStorage.setItem("user", JSON.stringify({ ...currentUser, ...profileData }))

    setIsLoading(false)
    alert("Perfil actualizado correctamente")
  }

  const handleSaveOrganization = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update localStorage
    const currentOnboarding = JSON.parse(localStorage.getItem("onboarding") || "{}")
    localStorage.setItem(
      "onboarding",
      JSON.stringify({
        ...currentOnboarding,
        sector: orgData.sector,
        employees: orgData.employees,
        objective: orgData.objective,
        interests: selectedInterests,
      }),
    )

    setIsLoading(false)
    alert("Configuración de organización actualizada")
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate password change
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordChangeModal(false)
    setIsLoading(false)
    alert("Contraseña actualizada correctamente")
  }

  const handleSaveAlerts = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update localStorage
    const currentOnboarding = JSON.parse(localStorage.getItem("onboarding") || "{}")
    localStorage.setItem(
      "onboarding",
      JSON.stringify({
        ...currentOnboarding,
        alerts: alertPreferences,
      }),
    )

    setIsLoading(false)
    alert("Preferencias de alertas actualizadas")
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Clear all data
    localStorage.clear()

    setIsLoading(false)
    setShowDeleteModal(false)
    router.push("/")
  }

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centro de cuenta</h1>
          <p className="text-gray-600">Administra tu perfil, configuración y preferencias</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="organization">Organización</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Información personal</h2>
                <p className="text-sm text-gray-600">Actualiza tu información de perfil</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Este correo se usa para iniciar sesión</p>
                </div>

                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Configuración de organización</h2>
                <p className="text-sm text-gray-600">Información sobre tu empresa y áreas de interés</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sector">Sector de la industria</Label>
                  <Select value={orgData.sector} onValueChange={(value) => setOrgData({ ...orgData, sector: value })}>
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
                  <Select
                    value={orgData.employees}
                    onValueChange={(value) => setOrgData({ ...orgData, employees: value })}
                  >
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
                    value={orgData.objective}
                    onChange={(e) => setOrgData({ ...orgData, objective: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Áreas de interés</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {INTERESTS.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all text-left ${
                          selectedInterests.includes(interest.id)
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Checkbox
                          checked={selectedInterests.includes(interest.id)}
                          onCheckedChange={() => toggleInterest(interest.id)}
                        />
                        <span className="text-sm font-medium text-gray-900">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveOrganization} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Seguridad</h2>
                <p className="text-sm text-gray-600">Administra tu contraseña y configuración de seguridad</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Contraseña</p>
                    <p className="text-sm text-gray-600">Última actualización: hace 14 días</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowPasswordChangeModal(true)}>
                    Cambiar contraseña
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Autenticación de dos factores</p>
                    <p className="text-sm text-gray-600">Agrega una capa extra de seguridad</p>
                  </div>
                  <Badge variant="free">Próximamente</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Sesiones activas</p>
                    <p className="text-sm text-gray-600">Administra tus dispositivos conectados</p>
                  </div>
                  <Button variant="outline" disabled>
                    Ver sesiones
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Preferencias de notificaciones</h2>
                <p className="text-sm text-gray-600">Configura cómo quieres recibir actualizaciones</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Alertas por correo</p>
                    <p className="text-sm text-gray-600">Recibe notificaciones importantes por email</p>
                  </div>
                  <Switch
                    checked={alertPreferences.emailAlerts}
                    onCheckedChange={(checked) => setAlertPreferences({ ...alertPreferences, emailAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones push</p>
                    <p className="text-sm text-gray-600">Alertas en tiempo real en tu navegador</p>
                  </div>
                  <Switch
                    checked={alertPreferences.pushAlerts}
                    onCheckedChange={(checked) => setAlertPreferences({ ...alertPreferences, pushAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Reporte semanal</p>
                    <p className="text-sm text-gray-600">Resumen de actividad cada semana</p>
                  </div>
                  <Switch
                    checked={alertPreferences.weeklyReport}
                    onCheckedChange={(checked) => setAlertPreferences({ ...alertPreferences, weeklyReport: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="frequency">Frecuencia de notificaciones</Label>
                  <Select
                    value={alertPreferences.frequency}
                    onValueChange={(value) => setAlertPreferences({ ...alertPreferences, frequency: value })}
                  >
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
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSaveAlerts} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Administración de cuenta</h2>
                <p className="text-sm text-gray-600">Administra tu plan y configuración de cuenta</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Plan actual</p>
                    <p className="text-sm text-gray-600">Plan Free - Actualiza para más funcionalidades</p>
                  </div>
                  <Button variant="outline" onClick={() => router.push("/plans")}>
                    Ver planes
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">Uso actual</p>
                    <p className="text-sm text-gray-600">247 de 500 registros mensuales</p>
                  </div>
                  <Badge variant="free">49% usado</Badge>
                </div>

                <div className="p-4 rounded-lg border border-error/20 bg-error/5">
                  <div className="mb-4">
                    <p className="font-medium text-gray-900 mb-1">Zona de peligro</p>
                    <p className="text-sm text-gray-600">
                      Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                    Eliminar cuenta
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="¿Eliminar cuenta?"
        description="Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, configuraciones y acceso a PQP 5.0."
        confirmText="Sí, eliminar cuenta"
        cancelText="Cancelar"
        variant="danger"
      />

      {/* Change Password Modal */}
      <ConfirmModal
        isOpen={showPasswordChangeModal}
        onClose={() => setShowPasswordChangeModal(false)}
        onConfirm={handleChangePassword}
        title="Cambiar contraseña"
        description="Ingresa tu contraseña actual y la nueva contraseña que deseas usar."
        confirmText="Cambiar contraseña"
        cancelText="Cancelar"
        variant="info"
      />
    </div>
  )
}
