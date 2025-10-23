import { cn } from "@/lib/utils"
import { CheckIcon } from "@/components/ui/icons"

interface Step {
  id: string
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                    isCompleted && "bg-primary text-white",
                    isCurrent && "bg-primary text-white ring-4 ring-primary/20",
                    isUpcoming && "bg-gray-200 text-gray-600",
                  )}
                >
                  {isCompleted ? <CheckIcon className="w-5 h-5" /> : stepNumber}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      (isCompleted || isCurrent) && "text-gray-900",
                      isUpcoming && "text-gray-500",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors",
                    stepNumber < currentStep ? "bg-primary" : "bg-gray-200",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
