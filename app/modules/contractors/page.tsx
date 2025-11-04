// === CONTRACTORS & SUPPLIERS MODULE ===
// ERP-style table with vendor management, HSE certification, and ratings

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCard } from "@/components/cards/stats-card";
import {
  Building2,
  Search,
  Star,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Contractor {
  id: string;
  name: string;
  service: string;
  hse: "certified" | "pending" | "expired";
  rating: number;
  status: "active" | "inactive" | "suspended";
  projects: number;
  lastProject: string;
}

export default function ContractorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const contractors: Contractor[] = [
    {
      id: "1",
      name: "Ingeniería Total S.A.S",
      service: "Mantenimiento Mecánico",
      hse: "certified",
      rating: 4.8,
      status: "active",
      projects: 24,
      lastProject: "2024-10-15",
    },
    {
      id: "2",
      name: "Soldaduras Industriales Ltda",
      service: "Soldadura Especializada",
      hse: "certified",
      rating: 4.9,
      status: "active",
      projects: 18,
      lastProject: "2024-10-20",
    },
    {
      id: "3",
      name: "Instrumentación Andina",
      service: "Calibración y Control",
      hse: "pending",
      rating: 4.5,
      status: "active",
      projects: 12,
      lastProject: "2024-09-30",
    },
    {
      id: "4",
      name: "Montajes y Estructuras del Caribe",
      service: "Montaje Industrial",
      hse: "certified",
      rating: 4.7,
      status: "active",
      projects: 31,
      lastProject: "2024-11-01",
    },
    {
      id: "5",
      name: "Equipos y Repuestos SAS",
      service: "Suministro de Repuestos",
      hse: "expired",
      rating: 3.9,
      status: "suspended",
      projects: 8,
      lastProject: "2024-08-12",
    },
    {
      id: "6",
      name: "Sistemas Eléctricos del Pacífico",
      service: "Electricidad Industrial",
      hse: "certified",
      rating: 4.6,
      status: "active",
      projects: 22,
      lastProject: "2024-10-28",
    },
  ];

  const filteredContractors = contractors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHSEBadge = (hse: Contractor["hse"]) => {
    switch (hse) {
      case "certified":
        return <Badge className="bg-emerald-100 text-emerald-800">Certificado</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-800">Pendiente</Badge>;
      case "expired":
        return <Badge variant="destructive">Vencido</Badge>;
    }
  };

  const getStatusBadge = (status: Contractor["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Activo</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactivo</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspendido</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<Building2 className="w-6 h-6 text-primary" />}
          title="Contratistas y Proveedores"
          subtitle="Gestión integral de empresas certificadas"
          cta={<Button>+ Nuevo Proveedor</Button>}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Proveedores Activos"
            value="156"
            trend={{ value: "+12", direction: "up" }}
            description="vs mes anterior"
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatsCard
            title="Certificados HSE"
            value="142"
            trend={{ value: "91%", direction: "neutral" }}
            description="tasa de cumplimiento"
            icon={<Shield className="w-5 h-5" />}
          />
          <StatsCard
            title="Rating Promedio"
            value="4.7"
            trend={{ value: "+0.3", direction: "up" }}
            description="sobre 5.0"
            icon={<Star className="w-5 h-5" />}
          />
          <StatsCard
            title="Proyectos Activos"
            value="47"
            description="en ejecución"
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Directorio de Proveedores</CardTitle>
                <CardDescription>
                  Listado completo con certificaciones y desempeño
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar proveedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Empresa</TableHead>
                    <TableHead className="font-semibold">Servicio</TableHead>
                    <TableHead className="font-semibold text-center">HSE</TableHead>
                    <TableHead className="font-semibold text-center">Rating</TableHead>
                    <TableHead className="font-semibold text-center">Estado</TableHead>
                    <TableHead className="font-semibold text-center">Proyectos</TableHead>
                    <TableHead className="font-semibold">Último Trabajo</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContractors.map((contractor) => (
                    <TableRow key={contractor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {contractor.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {contractor.service}
                      </TableCell>
                      <TableCell className="text-center">
                        {getHSEBadge(contractor.hse)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{contractor.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(contractor.status)}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {contractor.projects}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {contractor.lastProject}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredContractors.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No se encontraron proveedores con ese criterio
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* HSE Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Certificaciones Vigentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm">ISO 45001 - Seguridad Ocupacional</span>
                  <Badge className="bg-emerald-100 text-emerald-800">125 proveedores</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm">ISO 14001 - Gestión Ambiental</span>
                  <Badge className="bg-emerald-100 text-emerald-800">118 proveedores</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm">RUC - Registro Único de Contratistas</span>
                  <Badge className="bg-emerald-100 text-emerald-800">142 proveedores</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Alertas de Vencimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <div>
                    <p className="text-sm font-medium">Equipos y Repuestos SAS</p>
                    <p className="text-xs text-gray-600">Certificado HSE vencido</p>
                  </div>
                  <Button variant="outline" size="sm">Notificar</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <div>
                    <p className="text-sm font-medium">Instrumentación Andina</p>
                    <p className="text-xs text-gray-600">Renovación en 15 días</p>
                  </div>
                  <Button variant="outline" size="sm">Recordar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
