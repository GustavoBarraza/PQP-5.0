"use client"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"

interface BannerProps {
  title: string
  description?: string
  badge?: {
    text: string
    variant?: "free" | "essential" | "advanced" | "enterprise"
  }
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function Banner({ title, description, badge, action, className }: BannerProps) {
  return (
    <div className={cn("rounded-lg border border-primary/20 bg-primary-light p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
          </div>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        {action && (
          <Button onClick={action.onClick} variant="outline" size="sm">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
