import type React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
  loading?: boolean
  className?: string
}

export function MetricCard({ title, value, change, icon, loading, className }: MetricCardProps) {
  if (loading) {
    return (
      <div className={cn("rounded-lg border bg-white p-6", className)}>
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg border bg-white p-6 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <p
            className={cn(
              "text-sm font-medium",
              change.trend === "up" && "text-success",
              change.trend === "down" && "text-error",
              change.trend === "neutral" && "text-gray-600",
            )}
          >
            {change.value}
          </p>
        )}
      </div>
    </div>
  )
}
