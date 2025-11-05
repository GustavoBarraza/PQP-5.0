"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Eye, Zap, Users, TrendingUp, Shield, Lightbulb, ArrowRight } from "lucide-react";

export default function MisionVisionPage() {
  const valores = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Seguridad y Cumplimiento",
      description: "Prioridad absoluta en HSE y normativas industriales, garantizando operaciones seguras y conformes.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "Innovación Continua",
      description: "Adoptamos tecnologías emergentes para optimizar procesos y anticiparnos a las necesidades del sector.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Colaboración",
      description: "Fomentamos el trabajo en equipo y la transparencia para maximizar el impacto colectivo.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Excelencia Operacional",
      description: "Compromiso con la mejora continua y la eficiencia en cada proceso industrial.",
    },
  ];

  const propuestasValor = [
    {
      title: "Decisiones Basadas en Datos",
      description: "Transformamos datos operacionales en insights accionables con analítica predictiva avanzada.",
      benefit: "Reducción de hasta 40% en costos operativos",
    },
    {
      title: "Optimización de Paradas",
      description: "Planificación inteligente de mantenimiento que minimiza tiempos muertos y maximiza ROI.",
      benefit: "Ahorro promedio de $500K USD por parada",
    },
    {
      title: "Gestión Integral HSE",
      description: "Monitoreo en tiempo real de seguridad, salud y cumplimiento ambiental.",
      benefit: "100% de trazabilidad y cumplimiento",
    },
    {
      title: "Colaboración sin Fronteras",
      description: "Plataforma unificada que conecta equipos, proveedores y stakeholders en tiempo real.",
      benefit: "50% menos tiempo en coordinación",
    },
  ];

  return (
    <div className="min-h-screen bg-black-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-black">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Nuestra Razón de Ser
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Misión, Visión y Valores</h1>
            <p className="text-xl text-black/90">
              Transformando la industria a través de la innovación tecnológica y el compromiso con la excelencia operacional
            </p>
          </div>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Misión */}
          <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-black-900">Nuestra Misión</h2>
              </div>
              <p className="text-lg text-black-700 leading-relaxed mb-4">
                Empoderar a las industrias de energía e infraestructura con una plataforma integral que integra{" "}
                <strong>calidad, productividad y personas (PQP)</strong>, facilitando la toma de decisiones basadas en
                datos y promoviendo una cultura de mejora continua.
              </p>
              <p className="text-lg text-black-700 leading-relaxed">
                Nos comprometemos a optimizar operaciones, reducir costos y maximizar el impacto positivo en seguridad,
                sostenibilidad y rentabilidad.
              </p>
            </CardContent>
          </Card>

          {/* Visión */}
          <Card className="border-2 border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold tex-black-900">Nuestra Visión</h2>
              </div>
              <p className="text-lg text-black-700 leading-relaxed mb-4">
                Ser la plataforma líder en Latinoamérica para la gestión industrial inteligente, reconocida por nuestra
                capacidad de transformar datos en valor y por fomentar ecosistemas colaborativos que impulsen la
                competitividad y sostenibilidad del sector.
              </p>
              <p className="text-lg text-black-700 leading-relaxed">
                Aspiramos a convertirnos en el estándar de referencia para la Industria 5.0 en la región.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Nuestros Principios
            </Badge>
            <h2 className="text-4xl font-bold text-black-900 mb-4">Valores que nos Definen</h2>
            <p className="text-lg text-black-600 max-w-2xl mx-auto">
              Los pilares fundamentales que guían cada decisión y acción en PQP 5.0
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4">{valor.icon}</div>
                  <h3 className="text-xl font-bold text-black-900 mb-3">{valor.title}</h3>
                  <p className="text-black-600 text-sm leading-relaxed">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Propuesta de Valor */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="essential" className="mb-4">
              ¿Por qué PQP 5.0?
            </Badge>
            <h2 className="text-4xl font-bold text-black-900 mb-4">Nuestra Propuesta de Valor</h2>
            <p className="text-lg text-black-600 max-w-3xl mx-auto">
              Soluciones concretas que generan impacto medible en sus operaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propuestasValor.map((propuesta, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-black-900 mb-3">{propuesta.title}</h3>
                  <p className="text-black-700 mb-4 leading-relaxed">{propuesta.description}</p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm">{propuesta.benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-black-900 mb-4">¿Listo para Transformar su Operación?</h2>
          <p className="text-lg text-black-700 mb-8 max-w-2xl mx-auto">
            Únase a las empresas líderes que ya están optimizando sus procesos con PQP 5.0
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/register">
                Comenzar Gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/plans">Ver Planes y Precios</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
