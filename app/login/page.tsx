import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Bienvenido de vuelta</h1>
          <p className="text-gray-600">Ingresa a tu cuenta para continuar</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
