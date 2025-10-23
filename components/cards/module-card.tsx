"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LockIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ModuleCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  locked?: boolean
  route?: string
  requiredPlan?: string
  onUnlock?: () => void
  className?: string
}

export function ModuleCard({
  title,
  description,
  icon,
  locked = false,
  route,
  requiredPlan,
  onUnlock,
  className,
}: ModuleCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (!locked && route) {
      router.push(route)
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 transition-all",
        locked ? "opacity-60" : "hover:shadow-md cursor-pointer",
        className,
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {requiredPlan && locked && (
              <Badge variant="outline" className="mt-1 text-xs">
                Requiere {requiredPlan}
              </Badge>
            )}
          </div>
        </div>
        {locked && (
          <div className="relative group">
            <LockIcon className="w-5 h-5 text-gray-400" />
            <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Disponible en plan {requiredPlan}
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {locked && onUnlock && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onUnlock()
          }}
          variant="outline"
          size="sm"
          className="w-full bg-transparent"
        >
          Desbloquear módulo
        </Button>
      )}
      {!locked && (
        <Button variant="ghost" size="sm" className="w-full">
          Abrir módulo →
        </Button>
      )}
    </div>
  )
}
