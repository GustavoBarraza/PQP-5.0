// === SHUTDOWN PLANNING MODULE ===
// Interactive timeline of maintenance tasks with resource allocation and optimization

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/cards/stats-card";
import { ShutdownCostCalculator } from "@/components/calculators/shutdown-cost-calculator";
import {
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface Task {
  id: string;
  name: string;
  area: string;
  duration: number;
  team: string;
  status: "pending" | "in-progress" | "completed" | "delayed";
  priority: "high" | "medium" | "low";
  startDay: number;
}

export default function ShutdownPlanningPage() {
  const [selectedTab, setSelectedTab] = useState("timeline");

  // Mock tasks data
  const tasks: Task[] = [
    {
      id: "1",
      name: "Inspección turbina principal",
      area: "Generación",
      duration: 3,
      team: "Equipo A",
      status: "completed",
      priority: "high",
      startDay: 1,
    },
    {
      id: "2",
      name: "Mantenimiento bomba #3",
      area: "Transferencia",
      duration: 2,
      team: "Equipo B",
      status: "in-progress",
      priority: "high",
      startDay: 2,
    },
    {
      id: "3",
      name: "Cambio de válvulas sección norte",
      area: "Distribución",
      duration: 4,
      team: "Equipo C",
      status: "pending",
      priority: "medium",
      startDay: 5,
    },
    {
      id: "4",
      name: "Calibración sensores IoT",
      area: "Monitoreo",
      duration: 1,
      team: "Equipo D",
      status: "delayed",
      priority: "low",
      startDay: 3,
    },
    {
      id: "5",
      name: "Reemplazo intercambiador de calor",
      area: "HVAC",
      duration: 5,
      team: "Equipo A",
      status: "pending",
      priority: "high",
      startDay: 8,
    },
  ];

  // Resource allocation chart data
  const resourceData = [
    { day: "Día 1", equipoA: 8, equipoB: 6, equipoC: 4 },
    { day: "Día 2", equipoA: 10, equipoB: 8, equipoC: 5 },
    { day: "Día 3", equipoA: 7, equipoB: 9, equipoC: 8 },
    { day: "Día 4", equipoA: 9, equipoB: 7, equipoC: 6 },
    { day: "Día 5", equipoA: 6, equipoB: 10, equipoC: 9 },
  ];

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delayed":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "delayed":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<Calendar className="w-6 h-6 text-primary" />}
          title="Planeación de Paradas"
          subtitle="Gestión inteligente de mantenimiento y recursos"
          cta={
            <Button>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Optimizar Cronograma
            </Button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Próxima Parada"
            value="22 días"
            description="Parada programada"
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatsCard
            title="Tareas Totales"
            value="47"
            trend={{ value: "+5", direction: "up" }}
            description="vs última parada"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatsCard
            title="Duración Estimada"
            value="15 días"
            trend={{ value: "-3 días", direction: "down" }}
            description="Optimización IA"
            icon={<Clock className="w-5 h-5" />}
          />
          <StatsCard
            title="Recursos Asignados"
            value="124"
            description="Técnicos y especialistas"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
            <TabsTrigger value="optimization">Optimización</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Tareas</CardTitle>
                <CardDescription>
                  Visualización de actividades y dependencias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">
                              {task.name}
                            </h4>
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {task.team}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.duration} días
                            </span>
                            <span>Área: {task.area}</span>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {getStatusIcon(task.status)}
                          {task.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              task.status === "completed"
                                ? "bg-emerald-600"
                                : task.status === "in-progress"
                                ? "bg-blue-600"
                                : task.status === "delayed"
                                ? "bg-red-600"
                                : "bg-gray-400"
                            }`}
                            style={{
                              width:
                                task.status === "completed"
                                  ? "100%"
                                  : task.status === "in-progress"
                                  ? "60%"
                                  : "0%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          Día {task.startDay}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asignación de Recursos</CardTitle>
                <CardDescription>
                  Distribución de equipos por día
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="equipoA" fill="#3b82f6" name="Equipo A" />
                      <Bar dataKey="equipoB" fill="#10b981" name="Equipo B" />
                      <Bar dataKey="equipoC" fill="#f59e0b" name="Equipo C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="space-y-4">
            <ShutdownCostCalculator />
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones de IA</CardTitle>
                <CardDescription>
                  Optimizaciones automáticas detectadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Reducción de 3 días en cronograma
                      </h4>
                      <p className="text-sm text-blue-800">
                        Paralelizar tareas en áreas independientes puede reducir
                        la duración total de 18 a 15 días.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-blue-600 text-blue-600"
                      >
                        Aplicar Optimización
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">
                        Conflicto de recursos detectado
                      </h4>
                      <p className="text-sm text-amber-800">
                        Equipo A asignado a 2 tareas simultáneas en día 8.
                        Reasignar bomba #3 a Equipo D.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-amber-600 text-amber-600"
                      >
                        Resolver Conflicto
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-1">
                        Ventana de oportunidad identificada
                      </h4>
                      <p className="text-sm text-emerald-800">
                        Agregar tarea de mejora continua en día 6 sin impacto en
                        cronograma crítico.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-emerald-600 text-emerald-600"
                      >
                        Agregar Tarea
                      </Button>
                    </div>
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
