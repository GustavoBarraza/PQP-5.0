"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, DollarSign, TrendingDown, Calculator } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ShutdownInputs {
  costoHoraParada: number;
  horasDetenidas: number;
  produccionDiaria: number;
  margenUnitario: number;
}

interface ShutdownResults {
  costoTotal: number;
  perdidaProduccion: number;
  margenPerdido: number;
  costoHora: number;
  trendData: Array<{
    hora: number;
    costoAcumulado: number;
    perdidaProduccion: number;
  }>;
}

function calculateShutdownCost(inputs: ShutdownInputs): ShutdownResults {
  const { costoHoraParada, horasDetenidas, produccionDiaria, margenUnitario } = inputs;

  const produccionHoraria = produccionDiaria / 24;
  const perdidaProduccion = produccionHoraria * horasDetenidas;
  const margenPerdido = perdidaProduccion * margenUnitario;
  const costoTotal = (costoHoraParada * horasDetenidas) + margenPerdido;

  const trendData = [];
  for (let i = 0; i <= horasDetenidas; i++) {
    const horasParciales = i;
    const costoParcial = costoHoraParada * horasParciales;
    const produccionPerdidaParcial = produccionHoraria * horasParciales;
    const margenPerdidoParcial = produccionPerdidaParcial * margenUnitario;
    const costoAcumuladoParcial = costoParcial + margenPerdidoParcial;

    trendData.push({
      hora: i,
      costoAcumulado: costoAcumuladoParcial,
      perdidaProduccion: produccionPerdidaParcial,
    });
  }

  return {
    costoTotal,
    perdidaProduccion,
    margenPerdido,
    costoHora: costoHoraParada + (produccionHoraria * margenUnitario),
    trendData,
  };
}

export function ShutdownCostCalculator() {
  const [inputs, setInputs] = useState<ShutdownInputs>({
    costoHoraParada: 50000,
    horasDetenidas: 48,
    produccionDiaria: 100000,
    margenUnitario: 15,
  });

  const [results, setResults] = useState<ShutdownResults | null>(null);

  const handleCalculate = () => {
    const calculated = calculateShutdownCost(inputs);
    setResults(calculated);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Cálculo de Costo de Parada de Planta
          </CardTitle>
          <CardDescription>
            Estime el impacto económico de una parada no planificada o de mantenimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="costoHora">
                Costo por Hora de Parada (USD)
              </Label>
              <Input
                id="costoHora"
                type="number"
                value={inputs.costoHoraParada}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    costoHoraParada: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="50000"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Costos operativos fijos por hora parada
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horas">
                Horas Detenidas
              </Label>
              <Input
                id="horas"
                type="number"
                value={inputs.horasDetenidas}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    horasDetenidas: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="48"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Duración total de la parada
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="produccion">
                Producción Diaria (Unidades/Barriles)
              </Label>
              <Input
                id="produccion"
                type="number"
                value={inputs.produccionDiaria}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    produccionDiaria: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="100000"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Capacidad productiva en operación normal
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="margen">
                Margen Unitario (USD)
              </Label>
              <Input
                id="margen"
                type="number"
                value={inputs.margenUnitario}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    margenUnitario: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="15"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Ganancia por unidad producida
              </p>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="mt-6 w-full md:w-auto bg-orange-600 hover:bg-orange-700"
            size="lg"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calcular Costo de Parada
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card className="border-2 border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <TrendingDown className="w-6 h-6" />
                Impacto Económico Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-6">
                <div className="text-center">
                  <div className="text-sm text-red-700 font-medium mb-2">
                    Costo Total Estimado
                  </div>
                  <div className="text-6xl font-bold text-red-900 mb-4">
                    {formatCurrency(results.costoTotal)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Por {inputs.horasDetenidas} horas de parada ({(inputs.horasDetenidas / 24).toFixed(1)} días)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-1">
                    Costo Operativo
                  </div>
                  <div className="text-2xl font-bold text-orange-900">
                    {formatCurrency(inputs.costoHoraParada * inputs.horasDetenidas)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {formatCurrency(inputs.costoHoraParada)}/hora
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">
                    Producción Perdida
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {formatNumber(results.perdidaProduccion)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    unidades/barriles
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">
                    Margen Perdido
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {formatCurrency(results.margenPerdido)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    en ventas no realizadas
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">
                      Costo por Hora Promedio
                    </h4>
                    <p className="text-yellow-800 text-sm">
                      Cada hora de parada representa una pérdida de <strong>{formatCurrency(results.costoHora)}</strong> considerando costos operativos y producción no realizada.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Costos Acumulados</CardTitle>
              <CardDescription>
                Evolución del impacto económico hora por hora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.trendData}>
                    <defs>
                      <linearGradient id="colorCosto" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="hora"
                      label={{ value: "Horas de Parada", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      label={{ value: "Costo Acumulado (USD)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        if (name === "costoAcumulado") {
                          return [formatCurrency(value), "Costo Total"];
                        }
                        return [formatNumber(value), "Producción Perdida"];
                      }}
                      labelFormatter={(hour) => `Hora ${hour}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="costoAcumulado"
                      stroke="#dc2626"
                      fillOpacity={1}
                      fill="url(#colorCosto)"
                      name="Costo Acumulado"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
