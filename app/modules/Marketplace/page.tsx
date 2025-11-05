"use client";

import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersIcon, CheckIcon } from "@/components/ui/icons";

export default function MarketplacePage() {
    const router = useRouter();

    const providers = [
    { name: "Proveedor A", service: "Mantenimiento Industrial" },
    { name: "Proveedor B", service: "Repuestos Mecánicos" },
    { name: "Proveedor C", service: "Consultoría Técnica" },
    ];

    return (
    <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
            <UsersIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketplace</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora proveedores, servicios y soluciones conectadas para tus
            operaciones
            </p>
        </div>

        <Card className="mb-8">
            <CardHeader>
            <CardTitle>Proveedores Destacados</CardTitle>
            <CardDescription>Ejemplos de servicios disponibles</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                <div
                    key={provider.name}
                    className="flex items-start gap-3 p-4 border rounded-xl bg-white shadow-sm"
                >
                    <CheckIcon className="w-5 h-5 text-success mt-0.5" />
                    <div>
                    <p className="font-semibold text-gray-800">
                        {provider.name}
                    </p>
                    <p className="text-gray-600">{provider.service}</p>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Conecta con proveedores certificados
            </h2>
            <p className="text-gray-600 mb-6">
            Integra servicios directamente desde la plataforma para optimizar
            tus paradas y mantenimientos
            </p>
            <Button onClick={() => router.push("/dashboard")} size="lg">
            Volver al dashboard
            </Button>
        </div>
        </div>
    </div>
    );
}
