"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, AlertCircle } from "lucide-react";

export interface ROIInputs {
  inversion: number; // moneda (USD)
  roiTotalPercent?: number; // e.g., 140 means 140% total over horizon
  horizonYears?: number; // e.g., 2 years
}

export interface ROIResults {
  roiTotalPercent: number;
  roiAnnualPercent: number;
  ahorroAnual: number;
  ahorroTotal: number;
  interpretation: string;
  color: "green" | "red" | "yellow";
}

/**
 * calculateROI
 * - inversion: capital invertido (USD)
 * - roiTotalPercent: porcentaje total proyectado sobre la inversión en el horizonte (ej 140 = 140%)
 * - horizonYears: horizonte en años donde se espera ese ROI total (ej 2)
 *
 * Devuelve: ROI total (%), ROI anual (%), ahorro anual (USD), ahorro total (USD)
 */
export function calculateROI({ inversion, roiTotalPercent = 140, horizonYears = 2 }: ROIInputs): ROIResults {
  const roiTotal = roiTotalPercent; // e.g., 140
  const roiAnnual = horizonYears > 0 ? roiTotal / horizonYears : roiTotal; // e.g., 70% anual

  const ahorroTotal = (inversion * roiTotal) / 100;
  const ahorroAnual = ahorroTotal / horizonYears;

  // Interpretación simple
  let interpretation = "";
  let color: ROIResults["color"] = "yellow";
  if (roiTotal > 100) {
    interpretation = "Excelente: retorno muy superior a la inversión en el periodo.";
    color = "green";
  } else if (roiTotal > 50) {
    interpretation = "Muy bueno: retorno positivo significativo.";
    color = "green";
  } else if (roiTotal > 0) {
    interpretation = "Positivo: inversión produce ahorro.";
    color = "yellow";
  } else {
    interpretation = "Negativo: no se recupera la inversión en el periodo.";
    color = "red";
  }

  return {
    roiTotalPercent: roiTotal,
    roiAnnualPercent: roiAnnual,
    ahorroAnual,
    ahorroTotal,
    interpretation,
    color,
  };
}

export function ROICalculator() {
  const [inversion, setInversion] = useState<number>(300_000_000);
  const [roiTotalPercent, setRoiTotalPercent] = useState<number>(140);
  const [horizonYears, setHorizonYears] = useState<number>(2);
  const [results, setResults] = useState<ROIResults | null>(null);

  const presets = [
    { label: "140% en 2 años (70% anual)", total: 140, years: 2 },
  ];

  const runCalc = () => {
    if (!inversion || inversion <= 0) return;
    const r = calculateROI({ inversion, roiTotalPercent, horizonYears });
    setResults(r);
  };

  const reset = () => {
    setInversion(300_000_000);
    setRoiTotalPercent(140);
    setHorizonYears(2);
    setResults(null);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-700" />
            Calculadora de ROI (Inversionistas)
          </CardTitle>
          <CardDescription>Introduce la inversión y selecciona el preset o define tu propio porcentaje. Todos los cálculos en USD.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="inversion">Inversión inicial (USD)</Label>
              <Input
                id="inversion"
                type="number"
                value={inversion}
                onChange={(e) => setInversion(Number(e.target.value) || 0)}
                placeholder="300000000"
                className="text-lg"
                aria-label="Inversión inicial en dólares"
              />
            </div>

            <div>
              <Label htmlFor="roiTotal">ROI total proyectado (%)</Label>
              <Input
                id="roiTotal"
                type="number"
                value={roiTotalPercent}
                onChange={(e) => setRoiTotalPercent(Number(e.target.value) || 0)}
                placeholder="140"
                aria-label="ROI total proyectado en porcentaje"
              />
            </div>

            <div>
              <Label htmlFor="years">Horizonte (años)</Label>
              <Input
                id="years"
                type="number"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value) || 0)}
                placeholder="2"
                aria-label="Horizonte de inversión en años"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Presets</Label>
              <div className="flex gap-2 flex-wrap">
                {presets.map((p) => (
                  <Button
                    key={p.label}
                    variant={p.total === roiTotalPercent && p.years === horizonYears ? "default" : "outline"}
                    onClick={() => {
                      setRoiTotalPercent(p.total);
                      setHorizonYears(p.years);
                    }}
                    className="text-sm"
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={runCalc} className="bg-cyan-800 hover:bg-cyan-900">
              <TrendingUp className="w-4 h-4 mr-2" /> Calcular
            </Button>
            <Button variant="outline" onClick={reset}>
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card className={`border-2 ${results.color === "green" ? "border-emerald-500" : results.color === "red" ? "border-red-500" : "border-yellow-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados (USD)</span>
              <Badge className={`text-sm px-3 py-1 ${results.color === "green" ? "bg-emerald-500 text-white" : results.color === "red" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"}`}>
                {results.roiTotalPercent >= 100 ? "ROI Alto" : results.roiTotalPercent > 0 ? "ROI Positivo" : "ROI Negativo"}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Inversión Inicial</div>
                <div className="text-xl font-semibold">{formatCurrency(inversion)}</div>
              </div>

              <div className={`p-4 rounded-lg ${results.color === "green" ? "bg-emerald-50" : results.color === "red" ? "bg-rose-50" : "bg-amber-50"}`}>
                <div className="text-sm text-gray-600">Ahorro Anual estimado (USD)</div>
                <div className="text-xl font-semibold">{formatCurrency(results.ahorroAnual)}</div>
                <div className="text-xs text-gray-500">({formatPercent(results.roiAnnualPercent)} anual)</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Ahorro Total (USD) - horizonte</div>
                <div className="text-xl font-semibold">{formatCurrency(results.ahorroTotal)}</div>
                <div className="text-xs text-gray-500">({formatPercent(results.roiTotalPercent)} total)</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${results.color === "green" ? "bg-emerald-100 text-emerald-700" : results.color === "red" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{results.interpretation}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ROI anual estimado: <strong>{formatPercent(results.roiAnnualPercent)}</strong>. ROI total en {horizonYears} años: <strong>{formatPercent(results.roiTotalPercent)}</strong>.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return <ROICalculator />;
}