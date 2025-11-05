"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Recycle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CircularidadPage() {
const [records, setRecords] = useState<
    { proveedor: string; material: string; cantidad: number; costo: number }[]
>([]);
const [nuevo, setNuevo] = useState({
    proveedor: "",
    material: "",
    cantidad: "",
    costo: "",
});

  // Cargar desde localStorage al iniciar
useEffect(() => {
    const guardado = localStorage.getItem("economiaCircular");
    if (guardado) setRecords(JSON.parse(guardado));
}, []);

  // Guardar cada vez que cambie
useEffect(() => {
    localStorage.setItem("economiaCircular", JSON.stringify(records));
}, [records]);

const agregarRegistro = () => {
    if (!nuevo.proveedor || !nuevo.material || !nuevo.cantidad || !nuevo.costo)
    return alert("Faltan datos por completar.");

    setRecords([
    ...records,
    {
        proveedor: nuevo.proveedor,
        material: nuevo.material,
        cantidad: Number(nuevo.cantidad),
        costo: Number(nuevo.costo),
    },
    ]);

    setNuevo({ proveedor: "", material: "", cantidad: "", costo: "" });
};

  const total = records.reduce((sum, r) => sum + r.cantidad * r.costo, 0);

return (
    <div className="min-h-screen bg-gray-50">
    <PageContainer>
        <PageHeader
        icon={<Recycle className="w-6 h-6 text-green-600" />}
        title="Economía Circular"
        subtitle="Promoviendo la sostenibilidad y la reutilización de recursos en la planta"
        />

        <div className="bg-white rounded-lg border p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Registrar Material</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <Input
            placeholder="Proveedor"
            value={nuevo.proveedor}
            onChange={(e) =>
                setNuevo({ ...nuevo, proveedor: e.target.value })
            }
            />
            <Input
            placeholder="Material"
            value={nuevo.material}
            onChange={(e) => setNuevo({ ...nuevo, material: e.target.value })}
            />
            <Input
            placeholder="Cantidad (kg)"
            type="number"
            value={nuevo.cantidad}
            onChange={(e) => setNuevo({ ...nuevo, cantidad: e.target.value })}
            />
            <Input
            placeholder="Costo Unitario"
            type="number"
            value={nuevo.costo}
            onChange={(e) => setNuevo({ ...nuevo, costo: e.target.value })}
            />
            <Button onClick={agregarRegistro} className="bg-green-600">
            <PlusCircle className="w-4 h-4 mr-1" /> Agregar
            </Button>
        </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Materiales Registrados</h3>
        {records.length === 0 ? (
            <p className="text-gray-500 text-sm">Aún no hay registros.</p>
        ) : (
            <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-green-100">
                <tr>
                <th className="p-2 border">Proveedor</th>
                <th className="p-2 border">Material</th>
                <th className="p-2 border">Cantidad (kg)</th>
                <th className="p-2 border">Costo Unitario</th>
                <th className="p-2 border">Total</th>
                </tr>
            </thead>
            <tbody>
                {records.map((r, i) => (
                <tr key={i} className="hover:bg-green-50">
                    <td className="p-2 border">{r.proveedor}</td>
                    <td className="p-2 border">{r.material}</td>
                    <td className="p-2 border text-center">{r.cantidad}</td>
                    <td className="p-2 border">${r.costo.toLocaleString()}</td>
                    <td className="p-2 border font-semibold">
                      ${(r.cantidad * r.costo).toLocaleString()}
                    </td>
                </tr>
                ))}
            </tbody>
            <tfoot className="bg-green-50 font-semibold">
                <tr>
                <td className="p-2 border text-right" colSpan={4}>
                    Total
                </td>
                <td className="p-2 border">${total.toLocaleString()}</td>
                </tr>
            </tfoot>
            </table>
        )}
        </div>
    </PageContainer>
    </div>
);
}