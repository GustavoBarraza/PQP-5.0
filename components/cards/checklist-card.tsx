"use client"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { CheckIcon } from "@/components/ui/icons"

interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

interface ChecklistCardProps {
  title: string
  items: ChecklistItem[]
  onToggle?: (id: string) => void
  className?: string
}

export function ChecklistCard({ title, items, onToggle, className }: ChecklistCardProps) {
  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length

  return (
    <div className={cn("rounded-lg border bg-white p-6", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <Progress value={completedCount} max={totalCount} showLabel />
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle?.(item.id)}
            className="flex items-center gap-3 w-full text-left group"
            type="button"
          >
            <div
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded border-2 transition-colors",
                item.completed ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary",
              )}
            >
              {item.completed && <CheckIcon className="w-3 h-3 text-white" />}
            </div>
            <span
              className={cn(
                "text-sm transition-colors",
                item.completed ? "text-gray-500 line-through" : "text-gray-900",
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
