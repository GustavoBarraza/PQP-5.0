// === HSE & ZERO ACCIDENTS MODULE ===

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Shield, CheckCircle, AlertTriangle, FileCheck } from "lucide-react";

interface SafetyIndicator {
  area: string;
  incidents: number;
  severity: "low" | "medium" | "high";
  status: "compliant" | "warning" | "critical";
}

interface AuditLog {
  id: string;
  date: string;
  auditor: string;
  type: string;
  result: "passed" | "warning" | "failed";
  score: number;
}

export default function HSEPage() {
  const safetyIndicators: SafetyIndicator[] = [
    { area: "Planta de Producción", incidents: 0, severity: "low", status: "compliant" },
    { area: "Almacén General", incidents: 0, severity: "low", status: "compliant" },
    { area: "Zona de Carga", incidents: 1, severity: "low", status: "warning" },
    { area: "Área de Mantenimiento", incidents: 0, severity: "low", status: "compliant" },
    { area: "Laboratorio", incidents: 0, severity: "low", status: "compliant" },
    { area: "Oficinas Administrativas", incidents: 0, severity: "low", status: "compliant" },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: "1",
      date: "2024-10-28",
      auditor: "María González",
      type: "Inspección HSE Mensual",
      result: "passed",
      score: 98,
    },
    {
      id: "2",
      date: "2024-10-15",
      auditor: "Carlos Mendoza",
      type: "Auditoría ISO 45001",
      result: "passed",
      score: 96,
    },
    {
      id: "3",
      date: "2024-10-10",
      auditor: "Ana Ramírez",
      type: "Control Ambiental",
      result: "warning",
      score: 92,
    },
    {
      id: "4",
      date: "2024-09-22",
      auditor: "Jorge Sánchez",
      type: "Inspección de Emergencias",
      result: "passed",
      score: 99,
    },
  ];

  const certifications = [
    { name: "ISO 45001", compliance: 98, expiry: "2025-06-15" },
    { name: "ISO 14001", compliance: 96, expiry: "2025-08-20" },
    { name: "OHSAS 18001", compliance: 94, expiry: "2025-04-10" },
    { name: "SG-SST", compliance: 99, expiry: "2025-12-31" },
  ];

  const getStatusBadge = (status: SafetyIndicator["status"]) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-emerald-100 text-emerald-800">Cumple</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Advertencia</Badge>;
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>;
    }
  };

  const getAuditBadge = (result: AuditLog["result"]) => {
    switch (result) {
      case "passed":
        return <Badge className="bg-emerald-100 text-emerald-800">Aprobado</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Observaciones</Badge>;
      case "failed":
        return <Badge variant="destructive">No Aprobado</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<Shield className="w-6 h-6 text-emerald-600" />}
          title="HSE & Zero Accidentes"
          subtitle="Sistema de Gestión de Seguridad y Salud Ocupacional"
          cta={<Button className="bg-emerald-600 hover:bg-emerald-700">+ Reportar Incidente</Button>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Safety Score"
            value="98%"
            trend={{ value: "+2%", direction: "up" }}
            description="vs mes anterior"
            icon={<Shield className="w-5 h-5" />}
          />
          <StatsCard
            title="Días sin Accidentes"
            value="247"
            trend={{ value: "Récord histórico", direction: "neutral" }}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatsCard
            title="Auditorías Completadas"
            value="24"
            trend={{ value: "+6", direction: "up" }}
            description="este trimestre"
            icon={<FileCheck className="w-5 h-5" />}
          />
          <StatsCard
            title="Tasa de Cumplimiento"
            value="96%"
            trend={{ value: "+1%", direction: "up" }}
            description="normativas vigentes"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Seguridad por Área</CardTitle>
              <CardDescription>Monitoreo de incidentes en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Área</TableHead>
                      <TableHead className="font-semibold text-center">Incidentes</TableHead>
                      <TableHead className="font-semibold text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {safetyIndicators.map((indicator, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{indicator.area}</TableCell>
                        <TableCell className="text-center">
                          <span
                            className={
                              indicator.incidents === 0
                                ? "text-emerald-600 font-semibold"
                                : "text-amber-600 font-semibold"
                            }
                          >
                            {indicator.incidents}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(indicator.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificaciones y Cumplimiento</CardTitle>
              <CardDescription>Estado de certificaciones internacionales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{cert.name}</p>
                          <p className="text-xs text-gray-600">Vence: {cert.expiry}</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        {cert.compliance}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${cert.compliance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Auditorías Recientes</CardTitle>
            <CardDescription>Historial de inspecciones y resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold">Auditor</TableHead>
                    <TableHead className="font-semibold">Tipo de Auditoría</TableHead>
                    <TableHead className="font-semibold text-center">Puntuación</TableHead>
                    <TableHead className="font-semibold text-center">Resultado</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{log.date}</TableCell>
                      <TableCell className="text-gray-600">{log.auditor}</TableCell>
                      <TableCell className="text-gray-600">{log.type}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={
                            log.score >= 95
                              ? "text-emerald-600 font-semibold"
                              : log.score >= 90
                              ? "text-amber-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {log.score}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getAuditBadge(log.result)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver Informe
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </div>
  );
}
