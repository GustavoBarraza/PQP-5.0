// === HOME / LANDING PAGE ===
// Main entry point with industrial design, cluster logos, and CTA buttons

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Factory, 
  TrendingUp, 
  Users, 
  Shield, 
  Recycle, 
  Award 
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Planeación Inteligente",
      description: "Optimiza paradas industriales con IA y análisis predictivo"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ROI Medible",
      description: "Reduce costos hasta 40% con análisis en tiempo real"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Colaboración Total",
      description: "Conecta plantas, proveedores y equipos en un solo lugar"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HSE & Cumplimiento",
      description: "Gestión completa de seguridad y normativas"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Economía Circular",
      description: "Valoriza residuos y cierra ciclos de materiales"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificación Digital",
      description: "Capacitación y certificaciones SENA integradas"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* === HERO SECTION === */}
      <section className="relative flex items-center justify-center min-h-[75vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl text-center text-white px-6 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center items-center gap-4 flex-wrap">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium">Powered by Industry 4.0</span>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            PQP 5.0
          </h1>
          
          <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-300">
            Plataforma Colaborativa 5.0
          </h2>
          
          <p className="mb-10 text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Revoluciona la gestión de paradas industriales con inteligencia artificial, 
            colaboración en tiempo real y economía circular integrada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-xl"
            >
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
            >
              <Link href="/dashboard">Ver Demo</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5" />
              <span>+50 Plantas Conectadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>+200 Proveedores</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>40% Reducción de Costos</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === FEATURES SECTION === */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tecnología de Clase Mundial
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma integral que transforma la gestión industrial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Operación?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a las empresas líderes que ya optimizan sus paradas industriales con PQP 5.0
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8"
            >
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              <Link href="/about">Conocer Más</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
