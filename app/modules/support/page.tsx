// === SUPPORT & TRAINING CENTER MODULE ===

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Headphones,
  BookOpen,
  Users,
  Clock,
  Award,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  progress: number;
  certification: boolean;
  students: number;
}

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created: string;
  assignee: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  likes: number;
  lastActivity: string;
  category: string;
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("courses");

  const courses: Course[] = [
    {
      id: "1",
      title: "Gestión Integral de Residuos Sólidos",
      instructor: "SENA - Instructor certificado",
      duration: "40 horas",
      progress: 75,
      certification: true,
      students: 124,
    },
    {
      id: "2",
      title: "Seguridad y Salud en el Trabajo",
      instructor: "SENA - Programa especializado",
      duration: "60 horas",
      progress: 45,
      certification: true,
      students: 98,
    },
    {
      id: "3",
      title: "Economía Circular en la Industria",
      instructor: "SENA - Formación complementaria",
      duration: "30 horas",
      progress: 100,
      certification: true,
      students: 156,
    },
    {
      id: "4",
      title: "Mantenimiento Preventivo y Predictivo",
      instructor: "SENA - Técnico profesional",
      duration: "50 horas",
      progress: 20,
      certification: true,
      students: 87,
    },
  ];

  const tickets: Ticket[] = [
    {
      id: "TK-1024",
      title: "Error al generar reporte de circularidad",
      status: "in-progress",
      priority: "high",
      created: "2024-11-01",
      assignee: "Soporte Técnico",
    },
    {
      id: "TK-1023",
      title: "Solicitud de capacitación en nuevas funcionalidades",
      status: "open",
      priority: "medium",
      created: "2024-10-30",
      assignee: "No asignado",
    },
    {
      id: "TK-1022",
      title: "Problema con certificación SENA",
      status: "resolved",
      priority: "low",
      created: "2024-10-28",
      assignee: "María González",
    },
    {
      id: "TK-1021",
      title: "Integración con sistema ERP",
      status: "in-progress",
      priority: "urgent",
      created: "2024-10-25",
      assignee: "Carlos Mendoza",
    },
  ];

  const discussions: Discussion[] = [
    {
      id: "1",
      title: "¿Cómo optimizar la valorización de plásticos industriales?",
      author: "Andrea López",
      replies: 12,
      likes: 24,
      lastActivity: "Hace 2 horas",
      category: "Circularidad",
    },
    {
      id: "2",
      title: "Mejores prácticas en auditorías HSE",
      author: "Jorge Ramírez",
      replies: 8,
      likes: 18,
      category: "HSE",
    },
    {
      id: "3",
      title: "Experiencias con certificación ISO 45001",
      author: "Carolina Soto",
      replies: 15,
      likes: 31,
      lastActivity: "Hace 5 horas",
      category: "Cumplimiento",
    },
    {
      id: "4",
      title: "Implementación de mantenimiento predictivo con IA",
      author: "Luis Fernández",
      replies: 6,
      likes: 14,
      lastActivity: "Hace 1 día",
      category: "Automatización",
    },
  ];

  const getTicketStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Abierto</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-800">En Progreso</Badge>;
      case "resolved":
        return <Badge className="bg-emerald-100 text-emerald-800">Resuelto</Badge>;
      case "closed":
        return <Badge variant="secondary">Cerrado</Badge>;
    }
  };

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline">Baja</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Media</Badge>;
      case "high":
        return <Badge className="bg-amber-100 text-amber-800">Alta</Badge>;
      case "urgent":
        return <Badge variant="destructive">Urgente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<Headphones className="w-6 h-6 text-blue-600" />}
          title="Centro de Soporte y Capacitación"
          subtitle="Recursos, formación y asistencia técnica"
          cta={<Button className="bg-blue-600 hover:bg-blue-700">+ Nuevo Ticket</Button>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Cursos Disponibles"
            value="24"
            description="con certificación SENA"
            icon={<BookOpen className="w-5 h-5" />}
          />
          <StatsCard
            title="Tickets Activos"
            value="12"
            trend={{ value: "-3", direction: "down" }}
            description="vs semana anterior"
            icon={<Headphones className="w-5 h-5" />}
          />
          <StatsCard
            title="Usuarios Capacitados"
            value="342"
            trend={{ value: "+28", direction: "up" }}
            description="este mes"
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            title="Tiempo Promedio de Respuesta"
            value="2.4h"
            trend={{ value: "-0.6h", direction: "down" }}
            description="mejora continua"
            icon={<Clock className="w-5 h-5" />}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="tickets">Tickets de Soporte</TabsTrigger>
            <TabsTrigger value="community">Comunidad</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Programa de Capacitación SENA</CardTitle>
                <CardDescription>
                  Cursos certificados para desarrollo profesional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            {course.certification && (
                              <Badge className="bg-blue-100 text-blue-800">
                                <Award className="w-3 h-3 mr-1" />
                                SENA
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>⏱ {course.duration}</span>
                            <span>👥 {course.students} estudiantes</span>
                          </div>
                        </div>
                        <Button variant={course.progress > 0 ? "outline" : "default"}>
                          {course.progress === 100
                            ? "Ver Certificado"
                            : course.progress > 0
                            ? "Continuar"
                            : "Inscribirse"}
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progreso</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Mis Tickets de Soporte</CardTitle>
                <CardDescription>
                  Seguimiento de solicitudes y problemas técnicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">ID</TableHead>
                        <TableHead className="font-semibold">Asunto</TableHead>
                        <TableHead className="font-semibold text-center">Estado</TableHead>
                        <TableHead className="font-semibold text-center">Prioridad</TableHead>
                        <TableHead className="font-semibold">Fecha</TableHead>
                        <TableHead className="font-semibold">Asignado a</TableHead>
                        <TableHead className="font-semibold text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono font-semibold">
                            {ticket.id}
                          </TableCell>
                          <TableCell className="font-medium max-w-xs">
                            {ticket.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {getTicketStatusBadge(ticket.status)}
                          </TableCell>
                          <TableCell className="text-center">
                            {getPriorityBadge(ticket.priority)}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {ticket.created}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {ticket.assignee}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Foro de la Comunidad</CardTitle>
                <CardDescription>
                  Comparte experiencias y resuelve dudas con otros usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{discussion.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Por {discussion.author}</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies} respuestas
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {discussion.likes}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {discussion.lastActivity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">Ver todas las discusiones</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </div>
  );
}
