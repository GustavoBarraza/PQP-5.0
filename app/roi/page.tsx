// === ROI CALCULATOR PAGE ===
// Standalone page for Return on Investment calculation

"use client";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ROICalculator } from "@/components/calculators/roi-calculator";
import { TrendingUp } from "lucide-react";

export default function ROIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageContainer>
        <PageHeader
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          title="Calculadora de ROI"
          subtitle="Evalúe el retorno de inversión de PQP 5.0 en su planta industrial"
        />

        <ROICalculator />

        {/* Additional context */}
        <div className="mt-8 p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            Metodología de Cálculo
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-gray-50 rounded font-mono text-xs">
              <strong>Beneficio Anual =</strong> (Ahorro por Parada × Paradas al
              Año) + Otros Beneficios
            </div>
            <div className="p-3 bg-gray-50 rounded font-mono text-xs">
              <strong>Costo Total =</strong> Costo de Implementación + Costo
              Operativo Anual
            </div>
            <div className="p-3 bg-gray-50 rounded font-mono text-xs">
              <strong>ROI =</strong> (Beneficio Anual - Costo Total) / Costo Total
              × 100%
            </div>
            <div className="p-3 bg-gray-50 rounded font-mono text-xs">
              <strong>Período de Recuperación =</strong> Costo de Implementación /
              Beneficio Anual
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
