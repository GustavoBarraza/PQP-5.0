"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BellIcon, CheckIcon, AlertTriangleIcon, InfoIcon } from "@/components/ui/icons"

interface Alert {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
}

export default function AlertsModulePage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Nuevo registro completado",
      message: "Se ha registrado un nuevo usuario en el sistema",
      type: "success",
      timestamp: "Hace 5 minutos",
      read: false,
    },
    {
      id: "2",
      title: "Límite de almacenamiento",
      message: "Has utilizado el 80% de tu almacenamiento disponible",
      type: "warning",
      timestamp: "Hace 2 horas",
      read: false,
    },
    {
      id: "3",
      title: "Actualización disponible",
      message: "Nueva versión de PQP 5.0 disponible con mejoras",
      type: "info",
      timestamp: "Hace 1 día",
      read: true,
    },
  ])

  const [emailAlerts, setEmailAlerts] = useState(true)
  const [pushAlerts, setPushAlerts] = useState(false)
  const [frequency, setFrequency] = useState("realtime")

  const markAsRead = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckIcon className="w-5 h-5 text-success" />
      case "warning":
        return <AlertTriangleIcon className="w-5 h-5 text-warning" />
      case "error":
        return <AlertTriangleIcon className="w-5 h-5 text-error" />
      default:
        return <InfoIcon className="w-5 h-5 text-primary" />
    }
  }

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Alertas Inteligentes</h1>
            </div>
            <p className="text-gray-600">Notificaciones personalizadas y monitoreo en tiempo real</p>
          </div>
          <Button onClick={markAllAsRead} variant="outline">
            Marcar todas como leídas
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alertas recientes</CardTitle>
                <CardDescription>{alerts.filter((a) => !a.read).length} alertas sin leer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      alert.read ? "bg-gray-50 border-gray-200" : "bg-white border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          {!alert.read && (
                            <Button onClick={() => markAsRead(alert.id)} variant="ghost" size="sm" className="text-xs">
                              Marcar como leída
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de alertas</CardTitle>
                <CardDescription>Personaliza tus notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts" className="font-medium">
                        Alertas por email
                      </Label>
                      <p className="text-xs text-gray-500">Recibir notificaciones por correo</p>
                    </div>
                    <Switch id="email-alerts" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-alerts" className="font-medium">
                        Notificaciones push
                      </Label>
                      <p className="text-xs text-gray-500">Alertas en tiempo real</p>
                    </div>
                    <Switch id="push-alerts" checked={pushAlerts} onCheckedChange={setPushAlerts} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frecuencia</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Tiempo real</SelectItem>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Guardar configuración</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crear alerta personalizada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-name">Nombre de la alerta</Label>
                  <Input id="alert-name" placeholder="Ej: Límite de usuarios" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-condition">Condición</Label>
                  <Select>
                    <SelectTrigger id="alert-condition">
                      <SelectValue placeholder="Seleccionar condición" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="threshold">Umbral alcanzado</SelectItem>
                      <SelectItem value="change">Cambio detectado</SelectItem>
                      <SelectItem value="schedule">Programada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Crear alerta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
