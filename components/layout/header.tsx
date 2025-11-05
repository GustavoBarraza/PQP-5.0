"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Headphones, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nuestro Propósito" },
    { href: "/mision-vision", label: "Misión y Visión" },
    { href: "/plans", label: "Planes y Precios" },
    { href: "/dashboard", label: "Plataforma" },
    { href: "/roi", label: "Calculadora ROI" },
    { href: "/modules/marketplace", label: "Marketplace" },
    { href: "/modules/circularidad", label: "Economía Circular" },
    { href: "/onboarding", label: "Recorrido" },  
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* 🔹 BARRA SUPERIOR - Solo desktop */}
      <div className="hidden lg:block w-full bg-gray-50 border-b">
        <div className="flex justify-end items-center h-9 px-6 text-sm text-gray-700 gap-4">
          <button
            onClick={() => router.push("/modules/support")}
            className="flex items-center gap-1 cursor-pointer hover:text-cyan-800 transition-colors"
          >
            <Headphones className="w-4 h-4" />
            <span>Apoyo</span>
          </button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-cyan-800 transition-colors focus:outline-none">
                <User className="w-4 h-4" />
                <span>{user.name || user.email}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-cyan-800 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>

      {/* 🔹 BARRA PRINCIPAL */}
      <div className="flex items-center justify-between h-30 lg:h-40 px-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <img
            src="/Logopqp5.0.webp"
            alt="Logo PQP"
            className="h-40 lg:h-45 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-cyan-800 font-semibold"
                  : "text-gray-700 hover:text-cyan-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            asChild
            variant="outline"
            className="border-cyan-800 text-cyan-800 hover:bg-cyan-50 font-medium px-4 py-2 rounded-lg"
          >
            <Link href="/onboarding">Haz un recorrido</Link>
          </Button>

          <Button
            asChild
            variant="default"
            className="bg-cyan-800 hover:bg-cyan-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            <Link href="/register">Empezar</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-gray-700 hover:text-cyan-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔹 MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive(link.href)
                    ? "text-cyan-800 font-semibold"
                    : "text-gray-700 hover:text-cyan-800"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full border-cyan-800 text-cyan-800 hover:bg-cyan-50"
              >
                <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                  Haz un recorrido
                </Link>
              </Button>

              <Button
                asChild
                variant="default"
                className="w-full bg-cyan-800 hover:bg-cyan-900 text-white"
              >
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Empezar
                </Link>
              </Button>

              {/* Mobile Auth Section */}
              <div className="pt-2 border-t flex flex-col gap-2">
                <Link
                  href="/modules/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-cyan-800"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Apoyo</span>
                </Link>

                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-cyan-800"
                    >
                      <User className="w-4 h-4" />
                      <span>Mi Perfil</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-cyan-800"
                  >
                    <User className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}