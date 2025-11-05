"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wrench, Factory, Truck, Recycle } from "lucide-react";
import { useRouter } from "next/navigation";

const proveedores = [
  {
    id: 1,
    nombre: "TecnoMec S.A.",
    servicio: "Mantenimiento de maquinaria industrial",
    tipo: "Servicio",
    contacto: "contacto@tecnomec.com",
    icon: <Wrench className="w-6 h-6 text-blue-600" />,
  },
  {
    id: 2,
    nombre: "EcoPlast Ltda.",
    servicio: "Reciclaje de plásticos industriales",
    tipo: "Economía circular",
    contacto: "ventas@ecoplast.co",
    icon: <Recycle className="w-6 h-6 text-green-600" />,
  },
  {
    id: 3,
    nombre: "InsumosPro",
    servicio: "Suministro de repuestos y herramientas",
    tipo: "Proveedor",
    contacto: "info@insumospro.com",
    icon: <Factory className="w-6 h-6 text-gray-600" />,
  },
  {
    id: 4,
    nombre: "TransLogix",
    servicio: "Transporte de materiales y equipos",
    tipo: "Logística",
    contacto: "logistica@translogix.co",
    icon: <Truck className="w-6 h-6 text-orange-600" />,
  },
];

export default function MarketplacePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-white border rounded-2xl p-3 mb-4 shadow-sm">
            <ShoppingCart className="w-6 h-6 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Marketplace PQP</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conecte su planta con proveedores, servicios de mantenimiento y aliados estratégicos del ecosistema PQP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedores.map((prov) => (
            <Card
              key={prov.id}
              className="hover:shadow-lg transition-all border border-gray-200 bg-white"
            >
              <CardHeader className="flex flex-col items-center">
                <div className="mb-3">{prov.icon}</div>
                <CardTitle className="text-center text-lg font-bold text-gray-900">
                  {prov.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-gray-700 text-sm">{prov.servicio}</p>
                <p className="text-gray-500 text-xs">📧 {prov.contacto}</p>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => router.push("/paradas/nueva")}
                >
                  Conectar con parada
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
