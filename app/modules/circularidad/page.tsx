"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3 } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const circularidadData = [
  { name: "Ene", value: 8 },
  { name: "Feb", value: 12 },
  { name: "Mar", value: 15 },
  { name: "Abr", value: 13 },
  { name: "May", value: 18 },
  { name: "Jun", value: 20 },
  { name: "Jul", value: 22 },
]

export default function CircularidadPage() {
  const [range] = useState("6m")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Circularidad</h1>
              <p className="text-sm text-gray-600">Gestión y valorización de residuos — rango: {range}</p>
            </div>
          </div>
          <div>
            <Button onClick={() => alert("Abrir políticas de residuos (demo)")}>Ver políticas</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Toneladas valorizadas</CardDescription>
              <CardTitle className="text-2xl">1,240 t</CardTitle>
            </CardHeader>
            <CardContent>Reciclaje y valorización</CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tasa de recuperación</CardDescription>
              <CardTitle className="text-2xl">62%</CardTitle>
            </CardHeader>
            <CardContent>Mejora vs año anterior</CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Costos evitados</CardDescription>
              <CardTitle className="text-2xl">$ 1.120.000</CardTitle>
            </CardHeader>
            <CardContent>Ahorros por valorización</CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Incidencias SST</CardDescription>
              <CardTitle className="text-2xl">2</CardTitle>
            </CardHeader>
            <CardContent>Monitoreo activo</CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vista general</TabsTrigger>
            <TabsTrigger value="flows">Flujos</TabsTrigger>
            <TabsTrigger value="recyclers">Empresas Recicladoras</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Valorización mensual</CardTitle>
                <CardDescription>Evolución toneladas valorizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-white border rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={circularidadData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flows">
            <Card>
              <CardHeader>
                <CardTitle>Flujos de residuos</CardTitle>
                <CardDescription>Origen y destino</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mapa de flujos — (placeholder)</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recyclers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Empresas Recicladoras de Mamonal</CardTitle>
                <CardDescription>
                  Red de gestores autorizados para valorización de residuos industriales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* EcoReciclaje Mamonal */}
                  <div className="p-4 border-2 border-emerald-200 rounded-lg bg-emerald-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">EcoReciclaje Mamonal S.A.S</h3>
                        <p className="text-sm text-gray-600">Licencia Ambiental: LA-2024-001</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        Activo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📍 Ubicación:</span>
                        <span className="text-gray-600"> Zona Industrial Mamonal, Cartagena</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📞 Contacto:</span>
                        <span className="text-gray-600"> +57 300 123 4567</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700 block mb-2">Materiales Aceptados:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Plásticos industriales
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          PET, HDPE, PP
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Empaques multicapa
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Films plásticos
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metales del Caribe */}
                  <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Metales del Caribe Ltda.</h3>
                        <p className="text-sm text-gray-600">Licencia Ambiental: LA-2023-045</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        Activo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📍 Ubicación:</span>
                        <span className="text-gray-600"> Parque Industrial Mamonal</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📞 Contacto:</span>
                        <span className="text-gray-600"> +57 315 987 6543</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700 block mb-2">Materiales Aceptados:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">
                          Chatarra ferrosa
                        </span>
                        <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">
                          Aluminio industrial
                        </span>
                        <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">
                          Cobre y bronce
                        </span>
                        <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">
                          Acero inoxidable
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Papelera Caribe */}
                  <div className="p-4 border-2 border-amber-200 rounded-lg bg-amber-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Papelera Caribe Industrial</h3>
                        <p className="text-sm text-gray-600">Licencia Ambiental: LA-2024-018</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        Activo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📍 Ubicación:</span>
                        <span className="text-gray-600"> Sector 3, Mamonal</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📞 Contacto:</span>
                        <span className="text-gray-600"> +57 320 456 7890</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700 block mb-2">Materiales Aceptados:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                          Cartón industrial
                        </span>
                        <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                          Papel kraft
                        </span>
                        <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                          Archivo inactivo
                        </span>
                        <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                          Empaques corrugados
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vidrios y Cristales */}
                  <div className="p-4 border-2 border-cyan-200 rounded-lg bg-cyan-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Vidrios y Cristales del Norte</h3>
                        <p className="text-sm text-gray-600">Licencia Ambiental: LA-2023-092</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        Activo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📍 Ubicación:</span>
                        <span className="text-gray-600"> Vía Mamonal Km 8</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📞 Contacto:</span>
                        <span className="text-gray-600"> +57 310 234 5678</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700 block mb-2">Materiales Aceptados:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-medium rounded-full">
                          Vidrio transparente
                        </span>
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-medium rounded-full">
                          Vidrio de color
                        </span>
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-medium rounded-full">
                          Envases de vidrio
                        </span>
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-medium rounded-full">
                          Cristales industriales
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Orgánicos Sostenibles */}
                  <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Orgánicos Sostenibles Costa</h3>
                        <p className="text-sm text-gray-600">Licencia Ambiental: LA-2024-033</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        Activo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📍 Ubicación:</span>
                        <span className="text-gray-600"> Zona Verde Mamonal</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">📞 Contacto:</span>
                        <span className="text-gray-600"> +57 318 765 4321</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700 block mb-2">Materiales Aceptados:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                          Residuos vegetales
                        </span>
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                          Madera no tratada
                        </span>
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                          Compostables industriales
                        </span>
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                          Biomasa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes</CardTitle>
                <CardDescription>Exportes y certificados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Generador de reportes — (placeholder)</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
