"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TrendingUp, Factory, Recycle, ShoppingCart } from "lucide-react";

export default function NuevaParadaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    area: "",
    motivo: "",
    responsable: "",
    costo: "",
  });
  const [paradaRegistrada, setParadaRegistrada] = useState(false);
  const [roi, setRoi] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ROI = inversión * 70% anual
    const inversion = parseFloat(form.costo) || 0;
    const retorno = inversion * 0.7;
    setRoi(retorno);
    setParadaRegistrada(true);
  };

  if (paradaRegistrada) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <Card className="max-w-xl w-full shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              ✅ Parada registrada exitosamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-gray-700">
              <strong>{form.nombre}</strong> programada del{" "}
              <strong>{form.fechaInicio}</strong> al{" "}
              <strong>{form.fechaFin}</strong>.
            </p>
            <p className="text-gray-700">
              Inversión estimada:{" "}
              <strong>${Number(form.costo).toLocaleString()}</strong>
            </p>
            <p className="text-green-600 font-semibold text-lg">
              ROI estimado anual: ${roi.toLocaleString()} (70%)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => router.push("/marketplace")}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Marketplace
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/circularidad")}
              >
                <Recycle className="w-4 h-4 mr-2" /> Circularidad
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/calculadora-roi")}
              >
                <TrendingUp className="w-4 h-4 mr-2" /> ROI
              </Button>
            </div>

            <div className="mt-6">
              <Button onClick={() => router.push("/dashboard")}>
                Volver al dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Factory className="w-6 h-6 text-primary" /> Crear nueva parada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre de la parada</Label>
                <Input
                  name="nombre"
                  placeholder="Ej: Parada general planta 3"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Área o equipo</Label>
                <Input
                  name="area"
                  placeholder="Ej: Línea de producción A"
                  value={form.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Fecha de inicio</Label>
                <Input
                  type="date"
                  name="fechaInicio"
                  value={form.fechaInicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Fecha de fin</Label>
                <Input
                  type="date"
                  name="fechaFin"
                  value={form.fechaFin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Motivo</Label>
                <Input
                  name="motivo"
                  placeholder="Ej: Mantenimiento preventivo"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Responsable</Label>
                <Input
                  name="responsable"
                  placeholder="Ej: Juan Pérez"
                  value={form.responsable}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label>Costo estimado (COP)</Label>
                <Input
                  type="number"
                  name="costo"
                  placeholder="Ej: 300000000"
                  value={form.costo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="w-full md:w-1/2">
                Registrar parada
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
