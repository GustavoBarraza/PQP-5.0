// === COLLECTIVE IMPACT MODULE ===

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/cards/stats-card";
import { Network, TrendingUp, Leaf, Recycle, Building2 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface Company {
  id: string;
  name: string;
  sector: string;
  employees: number;
  impact: "high" | "medium" | "low";
}

interface ImpactMetric {
  label: string;
  value: string;
  unit: string;
  trend: number;
  icon: React.ReactNode;
}

export default function CollectiveImpactPage() {
  const companies: Company[] = [
    { id: "1", name: "Industrias del Caribe", sector: "Manufactura", employees: 450, impact: "high" },
    { id: "2", name: "Petroquímica del Atlántico", sector: "Químico", employees: 680, impact: "high" },
    { id: "3", name: "Alimentos del Valle", sector: "Alimentos", employees: 320, impact: "medium" },
    { id: "4", name: "Textiles Andinos", sector: "Textil", employees: 280, impact: "medium" },
    { id: "5", name: "Metalúrgica del Pacífico", sector: "Metalurgia", employees: 520, impact: "high" },
    { id: "6", name: "Farmacéutica del Norte", sector: "Farmacéutico", employees: 190, impact: "medium" },
    { id: "7", name: "Plásticos Industriales", sector: "Plásticos", employees: 240, impact: "medium" },
    { id: "8", name: "Cementos del Sur", sector: "Construcción", employees: 410, impact: "high" },
    { id: "9", name: "Agroindustrias del Este", sector: "Agroindustria", employees: 350, impact: "medium" },
    { id: "10", name: "Refinería del Magdalena", sector: "Petróleo", employees: 720, impact: "high" },
    { id: "11", name: "Energía Sostenible", sector: "Energía", employees: 180, impact: "low" },
    { id: "12", name: "Logística Integrada", sector: "Transporte", employees: 290, impact: "medium" },
  ];

  const impactMetrics: ImpactMetric[] = [
    {
      label: "Reducción de CO₂",
      value: "840",
      unit: "toneladas",
      trend: 12,
      icon: <Leaf className="w-5 h-5 text-teal-600" />,
    },
    {
      label: "Residuos Valorizados",
      value: "1,240",
      unit: "toneladas",
      trend: 18,
      icon: <Recycle className="w-5 h-5 text-teal-600" />,
    },
    {
      label: "Agua Recuperada",
      value: "2.8M",
      unit: "litros",
      trend: 9,
      icon: <TrendingUp className="w-5 h-5 text-teal-600" />,
    },
    {
      label: "Energía Ahorrada",
      value: "560",
      unit: "MWh",
      trend: 15,
      icon: <TrendingUp className="w-5 h-5 text-teal-600" />,
    },
  ];

  const networkGrowthData = [
    { month: "Ene", companies: 32, employees: 8200, impact: 420 },
    { month: "Feb", companies: 35, employees: 9100, impact: 485 },
    { month: "Mar", companies: 38, employees: 9800, impact: 540 },
    { month: "Abr", companies: 42, employees: 10500, impact: 610 },
    { month: "May", companies: 46, employees: 11200, impact: 695 },
    { month: "Jun", companies: 49, employees: 11900, impact: 760 },
    { month: "Jul", companies: 52, employees: 12400, impact: 840 },
  ];

  const getImpactBadge = (impact: Company["impact"]) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-teal-100 text-teal-800">Alto Impacto</Badge>;
      case "medium":
        return <Badge className="bg-cyan-100 text-cyan-800">Impacto Medio</Badge>;
      case "low":
        return <Badge variant="outline" className="text-gray-600">Bajo Impacto</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<Network className="w-6 h-6 text-teal-600" />}
          title="Impacto Colectivo"
          subtitle="Red colaborativa de sostenibilidad industrial"
          cta={<Button className="bg-teal-600 hover:bg-teal-700">+ Invitar Empresa</Button>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Empresas Conectadas"
            value="52"
            trend={{ value: "+6", direction: "up" }}
            description="vs mes anterior"
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatsCard
            title="Empleados Totales"
            value="12,400"
            trend={{ value: "+1,240", direction: "up" }}
            description="en la red"
            icon={<Network className="w-5 h-5" />}
          />
          <StatsCard
            title="Reducción de CO₂"
            value="840 t"
            trend={{ value: "+12%", direction: "up" }}
            description="este trimestre"
            icon={<Leaf className="w-5 h-5" />}
          />
          <StatsCard
            title="Residuos Valorizados"
            value="1,240 t"
            trend={{ value: "+18%", direction: "up" }}
            description="economía circular"
            icon={<Recycle className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Empresas de la Red</CardTitle>
              <CardDescription>Organizaciones comprometidas con la sostenibilidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg hover:from-teal-100 hover:to-cyan-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {company.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{company.name}</p>
                        <p className="text-xs text-gray-600">
                          {company.sector} • {company.employees} empleados
                        </p>
                      </div>
                    </div>
                    {getImpactBadge(company.impact)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>KPIs de Impacto Global</CardTitle>
              <CardDescription>Métricas consolidadas de toda la red</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {metric.icon}
                        <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                      </div>
                      <Badge className="bg-teal-100 text-teal-800">
                        +{metric.trend}%
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-teal-900">{metric.value}</span>
                      <span className="text-sm text-gray-600">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de la Red</CardTitle>
            <CardDescription>
              Evolución de empresas, empleados e impacto ambiental
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networkGrowthData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="companies"
                    stroke="#0d9488"
                    strokeWidth={2}
                    name="Empresas"
                    dot
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="impact"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    name="CO₂ Reducido (t)"
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Juntos generamos mayor impacto</h3>
                <p className="text-teal-100 mb-4">
                  Comparte tus mejores prácticas y aprende de otras empresas
                </p>
                <Button variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                  Explorar Casos de Éxito
                </Button>
              </div>
              <Network className="w-24 h-24 text-teal-200 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </div>
  );
}
