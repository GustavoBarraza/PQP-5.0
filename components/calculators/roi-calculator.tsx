"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar, AlertCircle } from "lucide-react";

/**
 * ROI Calculation Formulas:
 * 
 * Benefit = (savings_per_stop * stops_per_year) + other_annual_benefits
 * Cost = implementation_cost + annual_operational_cost
 * ROI = (Benefit - Cost) / Cost   // resultado en decimal -> mostrar como %
 * PaybackPeriod = implementation_cost / (savings_per_stop * stops_per_year + other_annual_benefits)
 */

interface ROIInputs {
  savingsPerStop: number;
  stopsPerYear: number;
  otherAnnualBenefits: number;
  implementationCost: number;
  annualOperationalCost: number;
}

interface ROIResults {
  roi: number;
  paybackPeriod: number;
  annualBenefit: number;
  totalCost: number;
  netBenefit: number;
  interpretation: string;
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const annualBenefit =
    inputs.savingsPerStop * inputs.stopsPerYear + inputs.otherAnnualBenefits;
  const totalCost = inputs.implementationCost + inputs.annualOperationalCost;
  const roi = totalCost > 0 ? ((annualBenefit - totalCost) / totalCost) * 100 : 0;
  const paybackPeriod =
    annualBenefit > 0 ? inputs.implementationCost / annualBenefit : Infinity;
  const netBenefit = annualBenefit - totalCost;

  let interpretation = "";
  if (roi > 50) {
    interpretation = "ROI Excelente — Altamente recomendable. Retorno superior al 50%.";
  } else if (roi > 20) {
    interpretation = "ROI Positivo — Recomendable. Buena inversión a mediano plazo.";
  } else if (roi > 0) {
    interpretation = "ROI Positivo — Aceptable. Evaluar otros factores estratégicos.";
  } else {
    interpretation = "ROI Negativo — No recomendable en términos financieros actuales.";
  }

  return {
    roi,
    paybackPeriod,
    annualBenefit,
    totalCost,
    netBenefit,
    interpretation,
  };
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    savingsPerStop: 250000, // USD
    stopsPerYear: 2,
    otherAnnualBenefits: 100000,
    implementationCost: 500000,
    annualOperationalCost: 80000,
  });

  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = () => {
    const calculated = calculateROI(inputs);
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
            Parámetros de Inversión
          </CardTitle>
          <CardDescription>
            Ingrese los datos de su proyecto de optimización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="savingsPerStop">
                Ahorro por Parada (USD)
              </Label>
              <Input
                id="savingsPerStop"
                type="number"
                value={inputs.savingsPerStop}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    savingsPerStop: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="250000"
              />
              <p className="text-xs text-gray-500">
                Ahorro estimado por cada parada optimizada
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopsPerYear">Paradas por Año</Label>
              <Input
                id="stopsPerYear"
                type="number"
                value={inputs.stopsPerYear}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    stopsPerYear: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="2"
              />
              <p className="text-xs text-gray-500">
                Número de paradas programadas anualmente
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherBenefits">
                Otros Beneficios Anuales (USD)
              </Label>
              <Input
                id="otherBenefits"
                type="number"
                value={inputs.otherAnnualBenefits}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    otherAnnualBenefits: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="100000"
              />
              <p className="text-xs text-gray-500">
                Eficiencia, reducción de inventarios, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="implementationCost">
                Costo de Implementación (USD)
              </Label>
              <Input
                id="implementationCost"
                type="number"
                value={inputs.implementationCost}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    implementationCost: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="500000"
              />
              <p className="text-xs text-gray-500">
                Inversión inicial en plataforma y capacitación
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operationalCost">
                Costo Operativo Anual (USD)
              </Label>
              <Input
                id="operationalCost"
                type="number"
                value={inputs.annualOperationalCost}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    annualOperationalCost: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="80000"
              />
              <p className="text-xs text-gray-500">
                Licencias, mantenimiento, soporte
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
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados del Análisis</span>
              <Badge 
                variant={results.roi > 0 ? "default" : "destructive"}
                className="text-lg px-4 py-1"
              >
                {results.roi > 0 ? "Positivo" : "Negativo"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <div className="text-sm text-emerald-700 font-medium mb-2">
                  ROI Anual
                </div>
                <div className="text-4xl font-bold text-emerald-900">
                  {formatPercent(results.roi)}
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">
                  Período de Recuperación
                </div>
                <div className="text-4xl font-bold text-blue-900">
                  {results.paybackPeriod === Infinity
                    ? "N/A"
                    : `${results.paybackPeriod.toFixed(1)} años`}
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-2">
                  Beneficio Neto Anual
                </div>
                <div className="text-3xl font-bold text-purple-900">
                  {formatCurrency(results.netBenefit)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Beneficio Anual Total:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.annualBenefit)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Costo Total Anual:</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Interpretación
                  </h4>
                  <p className="text-blue-800 text-sm">{results.interpretation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
