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
