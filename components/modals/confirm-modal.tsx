"use client"
import { XIcon, AlertIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "info",
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                variant === "danger"
                  ? "bg-error-light text-error"
                  : variant === "warning"
                    ? "bg-warning-light text-warning"
                    : "bg-info-light text-info"
              }`}
            >
              <AlertIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" type="button">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              {cancelText}
            </Button>
            <Button onClick={onConfirm} variant={variant === "danger" ? "destructive" : "default"}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
