import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="text-gray-600">Comienza gratis. Sin tarjeta de crédito requerida.</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <RegisterForm />

          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Iniciar sesión
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Al crear una cuenta, aceptas nuestros{" "}
          <Link href="/terms" className="underline hover:text-gray-700">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}
