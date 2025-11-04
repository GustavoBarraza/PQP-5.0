"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar, AlertCircle } from "lucide-react";

/**
 * ROI Calculation Formula (Simplified):
 * ROI = (Ahorro - Inversión) / Inversión × 100
 * 
 * Also calculates payback period: Inversión / (Ahorro / Período)
 */

interface SimpleROIInputs {
  inversion: number;
  ahorro: number;
  periodo: number;
}

interface SimpleROIResults {
  roi: number;
  paybackPeriod: number;
  ahorroMensual: number;
  interpretation: string;
  color: "green" | "red" | "yellow";
}

export function calculateSimpleROI(inputs: SimpleROIInputs): SimpleROIResults {
  const { inversion, ahorro, periodo } = inputs;
  
  const roi = inversion > 0 ? ((ahorro - inversion) / inversion) * 100 : 0;
  
  const ahorroMensual = periodo > 0 ? ahorro / periodo : 0;
  const paybackPeriod = ahorroMensual > 0 ? inversion / ahorroMensual : Infinity;

  let interpretation = "";
  let color: "green" | "red" | "yellow" = "yellow";

  if (roi > 0) {
    color = "green";
    if (roi > 100) {
      interpretation = "¡Excelente! El ahorro supera ampliamente la inversión inicial.";
    } else if (roi > 50) {
      interpretation = "Muy bueno. Retorno positivo significativo sobre la inversión.";
    } else {
      interpretation = "Positivo. La inversión genera beneficios económicos.";
    }
  } else {
    color = "red";
    interpretation = "Negativo. Los ahorros no superan la inversión en el período indicado.";
  }

  return {
    roi,
    paybackPeriod,
    ahorroMensual,
    interpretation,
    color,
  };
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<SimpleROIInputs>({
    inversion: 500000,
    ahorro: 800000,
    periodo: 12,
  });

  const [results, setResults] = useState<SimpleROIResults | null>(null);

  const handleCalculate = () => {
    const calculated = calculateSimpleROI(inputs);
    setResults(calculated);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Parámetros de Cálculo
          </CardTitle>
          <CardDescription>
            Ingrese los datos para calcular el retorno de inversión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inversion">
                Inversión Inicial (USD)
              </Label>
              <Input
                id="inversion"
                type="number"
                value={inputs.inversion}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    inversion: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="500000"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Inversión total en el proyecto
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ahorro">
                Ahorro Anual Proyectado (USD)
              </Label>
              <Input
                id="ahorro"
                type="number"
                value={inputs.ahorro}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    ahorro: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="800000"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Ahorro estimado por año
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodo">
                Período (Meses)
              </Label>
              <Input
                id="periodo"
                type="number"
                value={inputs.periodo}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    periodo: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="12"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                Tiempo de evaluación
              </p>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="mt-6 w-full md:w-auto"
            size="lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Calcular ROI
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card className={`border-2 ${results.color === "green" ? "border-emerald-500" : results.color === "red" ? "border-red-500" : "border-yellow-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultado del Análisis</span>
              <Badge 
                className={`text-lg px-4 py-1 ${
                  results.color === "green" ? "bg-emerald-500 text-white" : 
                  results.color === "red" ? "bg-red-500 text-white" : 
                  "bg-yellow-500 text-white"
                }`}
              >
                {results.roi > 0 ? "ROI Positivo" : "ROI Negativo"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ROI Principal */}
            <div className={`p-8 rounded-xl border-2 mb-6 ${
              results.color === "green" ? "bg-emerald-50 border-emerald-200" : 
              results.color === "red" ? "bg-red-50 border-red-200" : 
              "bg-yellow-50 border-yellow-200"
            }`}>
              <div className="text-center">
                <div className={`text-sm font-medium mb-2 ${
                  results.color === "green" ? "text-emerald-700" : 
                  results.color === "red" ? "text-red-700" : 
                  "text-yellow-700"
                }`}>
                  Retorno de Inversión (ROI)
                </div>
                <div className={`text-6xl font-bold mb-2 ${
                  results.color === "green" ? "text-emerald-900" : 
                  results.color === "red" ? "text-red-900" : 
                  "text-yellow-900"
                }`}>
                  {formatPercent(results.roi)}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Fórmula: (Ahorro - Inversión) / Inversión × 100
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  results.color === "green" ? "bg-emerald-100 text-emerald-800" : 
                  results.color === "red" ? "bg-red-100 text-red-800" : 
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">{results.interpretation}</span>
                </div>
              </div>
            </div>

            {/* Métricas Adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-1">
                  Período de Recuperación
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {results.paybackPeriod === Infinity
                    ? "N/A"
                    : `${results.paybackPeriod.toFixed(1)} meses`}
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-1">
                  Ahorro Mensual
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatCurrency(results.ahorroMensual)}
                </div>
              </div>
            </div>

            {/* Desglose */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">Inversión Inicial:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(inputs.inversion)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">Ahorro Proyectado:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(inputs.ahorro)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">Beneficio Neto:</span>
                <span className={`font-semibold ${results.roi > 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatCurrency(inputs.ahorro - inputs.inversion)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
