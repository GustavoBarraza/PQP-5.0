import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "free" | "essential" | "advanced" | "enterprise" | "default"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    free: "bg-gray-100 text-gray-700 border-gray-300",
    essential: "bg-blue-50 text-blue-700 border-blue-200",
    advanced: "bg-purple-50 text-purple-700 border-purple-200",
    enterprise: "bg-gray-900 text-white border-gray-900",
    default: "bg-gray-100 text-gray-700 border-gray-300",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
