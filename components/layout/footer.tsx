"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
return (
    <footer className="bg-white border-t py-10 text-gray-700">
    <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Columna 1 - Logo y descripción */}
        <div className="flex flex-col items-start">
        <img
            src="/Logopqp5.0.webp"
            alt="PQP 5.0"
            className="h-30 w-auto mb-3"
        />
        <p className="text-sm leading-relaxed">
            PQP 5.0: Innovando la conexión entre calidad, productividad y
            personas para un crecimiento sostenible.
        </p>
        </div>

        {/* Columna 2 - Enlaces Rápidos */}
        <div>
        <h3 className="font-bold mb-">Enlaces Rápidos</h3>
        <ul className="space-y-2 text-sm">
            <li>
            <Link href="/" className="hover:text-cyan-800">
                Inicio
            </Link>
            </li>
            <li>
            <Link href="/quienes-somos" className="hover:text-cyan-800">
                Quiénes Somos
            </Link>
            </li>
            <li>
            <Link href="/proposito" className="hover:text-cyan-800">
                Nuestro Propósito
            </Link>
            </li>
            <li>
            <Link href="/modulos" className="hover:text-cyan-800">
                Módulos PQP 5.0
            </Link>
            </li>
        </ul>
        </div>

        {/* Columna 3 - Legal */}
        <div>
        <h3 className="font-bold mb-2">Legal</h3>
        <ul className="space-y-1 text-sm">
            <li>
            <Link href="/terminos" className="hover:text-cyan-800">
                Términos y Condiciones
            </Link>
            </li>
        </ul>
        </div>

        {/* Columna 4 - Contacto */}
        <div>
        <h3 className="font-bold mb-2">Contacto</h3>
        <ul className="space-y-1 text-sm">
            <li>
            <Link href="/soporte" className="hover:text-cyan-800">
                Soporte
            </Link>
            </li>
            <li>
            <Link href="/ventas" className="hover:text-cyan-800">
                Ventas
            </Link>
            </li>
        </ul>
        </div>

        {/* Columna 5 - Preguntas */}
        <div>
        <h3 className="font-bold mb-2">¿Tienes alguna pregunta?</h3>
        <ul className="space-y-1 text-sm">
            <li>
            <Link href="/faq" className="hover:text-cyan-800">
                Preguntas frecuentes
            </Link>
            </li>
        </ul>
        </div>
    </div>

      {/* Línea inferior */}
    <div className="border-t mt-8 pt-6">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <p>Viva petro © 2025 PQP 5.0 Inc.</p>
        <div className="flex gap-4">
            <Link href="#" aria-label="Facebook">
            <Facebook className="w-4 h-4 hover:text-cyan-800" />
            </Link>
            <Link href="#" aria-label="Instagram">
            <Instagram className="w-4 h-4 hover:text-cyan-800" />
            </Link>
            <Link href="#" aria-label="Twitter">
            <Twitter className="w-4 h-4 hover:text-cyan-800" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4 hover:text-cyan-800" />
            </Link>
            <Link href="#" aria-label="YouTube">
            <Youtube className="w-4 h-4 hover:text-cyan-800" />
            </Link>
        </div>
        </div>
    </div>
    </footer>
    );
}
