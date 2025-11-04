// === ANALYTICS & ROI MODULE ===
// Dynamic charts showing efficiency, costs, savings, and ROI with interactive visualizations

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/cards/stats-card";
import { ChartBarIcon } from "@/components/ui/icons";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function AnalyticsModulePage() {
  // ROI and costs over time
  const roiData = [
    { month: "Ene", costos: 850, ahorros: 320, roi: 37 },
    { month: "Feb", costos: 920, ahorros: 410, roi: 44 },
    { month: "Mar", costos: 780, ahorros: 520, roi: 66 },
    { month: "Abr", costos: 890, ahorros: 680, roi: 76 },
    { month: "May", costos: 740, ahorros: 750, roi: 101 },
    { month: "Jun", costos: 680, ahorros: 820, roi: 120 },
  ];

  // Efficiency by area
  const efficiencyData = [
    { area: "Generación", eficiencia: 95 },
    { area: "Distribución", eficiencia: 88 },
    { area: "Mantenimiento", eficiencia: 92 },
    { area: "HSE", eficiencia: 97 },
    { area: "Logística", eficiencia: 85 },
  ];

  // Cost distribution
  const costDistribution = [
    { name: "Mano de Obra", value: 420, color: "#3b82f6" },
    { name: "Repuestos", value: 280, color: "#10b981" },
    { name: "Servicios", value: 180, color: "#f59e0b" },
    { name: "Logística", value: 120, color: "#ef4444" },
  ];

  // Performance gauge data
  const gaugeData = [
    { name: "Performance", value: 87, fill: "#3b82f6" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<ChartBarIcon className="w-6 h-6 text-primary" />}
          title="Análisis Avanzado"
          subtitle="Visualizaciones interactivas y reportes personalizados"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="ROI Acumulado"
            value="120%"
            trend={{ value: "+12%", direction: "up" }}
            description="vs mes anterior"
          />
          <StatsCard
            title="Ahorro Total"
            value="$ 3.5M"
            trend={{ value: "+18%", direction: "up" }}
            description="últimos 6 meses"
          />
          <StatsCard
            title="Eficiencia Promedio"
            value="91%"
            trend={{ value: "+5%", direction: "up" }}
            description="todas las áreas"
          />
          <StatsCard
            title="Costos Evitados"
            value="$ 1.2M"
            trend={{ value: "-8%", direction: "down" }}
            description="optimización IA"
          />
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="roi" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* ROI Tab */}
          <TabsContent value="roi" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de ROI</CardTitle>
                  <CardDescription>
                    Retorno de inversión mensual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={roiData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px' 
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="roi"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="ROI %"
                          dot={{ fill: "#10b981", r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Costos vs Ahorros</CardTitle>
                  <CardDescription>
                    Comparación mensual en miles de USD
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={roiData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px' 
                          }}
                        />
                        <Legend />
                        <Bar dataKey="costos" fill="#ef4444" name="Costos" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="ahorros" fill="#10b981" name="Ahorros" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Efficiency Tab */}
          <TabsContent value="efficiency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia por Área</CardTitle>
                <CardDescription>
                  Indicadores de desempeño operacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="area" type="category" width={120} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px' 
                        }}
                      />
                      <Bar 
                        dataKey="eficiencia" 
                        fill="#3b82f6" 
                        radius={[0, 8, 8, 0]}
                        label={{ position: 'right', formatter: (value: number) => `${value}%` }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Costos</CardTitle>
                  <CardDescription>
                    Desglose por categoría (miles USD)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${value}k`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {costDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalle de Costos</CardTitle>
                  <CardDescription>
                    Valores y porcentajes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costDistribution.map((item) => {
                      const total = costDistribution.reduce((sum, i) => sum + i.value, 0);
                      const percentage = ((item.value / total) * 100).toFixed(1);
                      return (
                        <div key={item.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              ${item.value}k ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: item.color 
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indicador de Performance Global</CardTitle>
                <CardDescription>
                  Medición integral del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="60%" 
                      outerRadius="100%" 
                      barSize={40}
                      data={gaugeData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="value"
                        cornerRadius={20}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-5xl font-bold"
                        fill="#3b82f6"
                      >
                        87%
                      </text>
                      <text
                        x="50%"
                        y="60%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm"
                        fill="#6b7280"
                      >
                        Performance Score
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">95%</div>
                    <div className="text-sm text-gray-600">Disponibilidad</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">88%</div>
                    <div className="text-sm text-gray-600">Calidad</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">79%</div>
                    <div className="text-sm text-gray-600">Rendimiento</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </div>
  );
}
