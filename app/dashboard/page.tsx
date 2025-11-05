"use client"
import React from "react"
import { useState } from "react"
import { AlertTriangle, TrendingUp, Clock, Users, Activity, Calendar } from "lucide-react"

// Tipos
interface BadgeProps {
  text: string
  variant: string
}

interface BannerProps {
  title: string
  description: string
  badge: BadgeProps
}

interface ModuleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  route: string
  locked: boolean
  onUnlock: () => void
}

interface ChangeProps {
  value: string
  trend: 'up' | 'down'
}

interface MetricCardProps {
  title: string
  value: string
  change: ChangeProps
  icon: React.ReactNode
}

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  onViewPlans: () => void
  onContactSales: () => void
}

interface Parada {
  fecha: string
  motivo: string
  duracion: string
  responsable: string
}

// Componentes
const Banner = ({ title, description, badge }: BannerProps) => (
  <div>
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {badge && (
        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
          {badge.text}
        </span>
      )}
    </div>
    <p className="text-gray-600 text-sm mt-1">{description}</p>
  </div>
)

const ModuleCard = ({ title, description, icon, route, locked, onUnlock }: ModuleCardProps) => (
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
    <div className="flex flex-col items-center text-center gap-3">
      <div className="text-blue-600">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
)

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-gray-600">{icon}</div>
      <p className="text-xs text-gray-600">{title}</p>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    {change && (
      <p className={`text-xs mt-1 ${change.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change.value}
      </p>
    )}
  </div>
)

// Botón con formulario de Parada
const ProgramarParadaButton = ({ onSubmit }: { onSubmit: (p: Parada) => void }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Parada>({
    fecha: "",
    motivo: "",
    duracion: "",
    responsable: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.fecha || !form.motivo || !form.duracion || !form.responsable) {
      alert("Todos los campos son obligatorios")
      return
    }
    onSubmit(form)
    setForm({ fecha: "", motivo: "", duracion: "", responsable: "" })
    setOpen(false)
    alert("✅ Parada programada correctamente.")
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Programar Parada
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="programarParadaTitle"
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 id="programarParadaTitle" className="text-xl font-bold mb-4">
              Programar nueva parada
            </h2>

            <div className="space-y-3">
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium mb-1">
                  Fecha
                </label>
                <input
                  id="fecha"
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="motivo" className="block text-sm font-medium mb-1">
                  Motivo
                </label>
                <input
                  id="motivo"
                  type="text"
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  placeholder="Ej. mantenimiento preventivo"
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="duracion" className="block text-sm font-medium mb-1">
                  Duración (horas)
                </label>
                <input
                  id="duracion"
                  type="number"
                  name="duracion"
                  value={form.duracion}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="responsable" className="block text-sm font-medium mb-1">
                  Responsable
                </label>
                <input
                  id="responsable"
                  type="text"
                  name="responsable"
                  value={form.responsable}
                  onChange={handleChange}
                  placeholder="Nombre del encargado"
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Modal premium
const UpsellModal = ({ isOpen, onClose, onViewPlans, onContactSales }: UpsellModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsellTitle"
    >
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 id="upsellTitle" className="text-xl font-bold mb-4">
          Funcionalidad Premium
        </h2>
        <p className="mb-6">Esta funcionalidad requiere un plan superior.</p>
        <div className="flex gap-3">
          <button onClick={onViewPlans} className="px-4 py-2 bg-blue-600 text-white rounded">
            Ver Planes
          </button>
          <button onClick={onContactSales} className="px-4 py-2 bg-gray-200 rounded">
            Contactar Ventas
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardGeneral() {
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [paradas, setParadas] = useState<Parada[]>([])

  const modules = [
    { id: "1", title: "Registro", description: "Información de planta, equipos y calendario", icon: <Clock className="w-6 h-6" />, route: "/registro" },
    { id: "2", title: "Analítica", description: "KPIs en tiempo real, comparativos históricos", icon: <TrendingUp className="w-6 h-6" />, route: "/analitica" },
    { id: "3", title: "Marketplace", description: "Compra de repuestos y servicios", icon: <Users className="w-6 h-6" />, route: "/marketplace" },
    { id: "4", title: "Circularidad", description: "Gestión y valorización de residuos", icon: <Activity className="w-6 h-6" />, route: "/circularidad" },
    { id: "5", title: "Mantenimiento Predictivo", description: "IoT, sensores y alertas tempranas", icon: <AlertTriangle className="w-6 h-6" />, route: "/predictivo" },
    { id: "6", title: "Tablero de Innovación", description: "Proyectos conjuntos y benchmarking", icon: <Activity className="w-6 h-6" />, route: "/innovacion" },
    { id: "7", title: "Academia PQP", description: "Capacitación digital y certificaciones SENA", icon: <Users className="w-6 h-6" />, route: "/academia" },
    { id: "8", title: "Soporte Prioritario", description: "Mesa técnica 24/7 y brigadas móviles", icon: <Activity className="w-6 h-6" />, route: "/soporte" },
    { id: "9", title: "Brigada de Emergencia", description: "Activación inmediata operativa", icon: <AlertTriangle className="w-6 h-6" />, route: "/brigada" },
    { id: "10", title: "Gestión SST y Ambiental", description: "Cumplimiento ISO 14001, 45001", icon: <Activity className="w-6 h-6" />, route: "/sst" },
  ]

  const handleModuleUnlock = () => setShowUpsellModal(true)
  const handleViewPlans = () => setShowUpsellModal(false)
  const handleContactSales = () => {
    setShowUpsellModal(false)
    alert("Disponible próximamente...")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Banner */}
      <div className="bg-white border-b shadow-sm py-6 px-8">
        <Banner title="Dashboard General" description="Visualización general del estado de la planta y rendimiento operativo" badge={{ text: "PQP", variant: "essential" }} />
      </div>

      <div className="flex flex-1">
        {/* Central */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Paradas de Planta</h1>
            <ProgramarParadaButton onSubmit={(p) => setParadas([...paradas, p])} />
          </div>

          <div className="mt-4">
            {paradas.length === 0 && <p className="text-gray-500">No hay paradas programadas.</p>}
            {paradas.map((p, i) => (
              <div key={i} className="border p-2 rounded mb-2 bg-white shadow-sm">
                <p><strong>Fecha:</strong> {p.fecha}</p>
                <p><strong>Motivo:</strong> {p.motivo}</p>
                <p><strong>Duración:</strong> {p.duracion} horas</p>
                <p><strong>Responsable:</strong> {p.responsable}</p>
              </div>
            ))}
          </div>

          {/* Grid módulos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
            {modules.map((mod) => (
              <ModuleCard key={mod.id} title={mod.title} description={mod.description} icon={mod.icon} route={mod.route} locked={false} onUnlock={handleModuleUnlock} />
            ))}
          </div>
        </main>

        {/* Lateral */}
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
              <MetricCard title="Disponibilidad" value="97%" change={{ value: "+1.2%", trend: "up" }} icon={<TrendingUp className="w-5 h-5" />} />
              <MetricCard title="Paradas" value="3" change={{ value: "-2", trend: "down" }} icon={<Clock className="w-5 h-5" />} />
            </div>
          </section>
        </aside>
      </div>

      {/* Modal */}
      <UpsellModal isOpen={showUpsellModal} onClose={() => setShowUpsellModal(false)} onViewPlans={handleViewPlans} onContactSales={handleContactSales} />
    </div>
  )
}
