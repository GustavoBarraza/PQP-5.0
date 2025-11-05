// components/ui/boton-programar-parada.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"

export interface Parada {
  fecha: string
  motivo: string
  duracion: string
  responsable: string
}

interface ProgramarParadaButtonProps {
  onSubmit: (parada: Parada) => void
}

export function ProgramarParadaButton({ onSubmit }: ProgramarParadaButtonProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Parada>({
    fecha: "",
    motivo: "",
    duracion: "",
    responsable: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.fecha || !form.motivo || !form.duracion || !form.responsable) {
      alert("Completa todos los campos antes de guardar.")
      return
    }
    onSubmit(form)
    alert("✅ Parada programada correctamente.")
    setForm({ fecha: "", motivo: "", duracion: "", responsable: "" })
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-primary text-white flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" />
        Programar Parada
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programar nueva parada</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Fecha de parada</Label>
              <Input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Motivo</Label>
              <Input
                type="text"
                name="motivo"
                placeholder="Ej. mantenimiento preventivo"
                value={form.motivo}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Duración estimada (horas)</Label>
              <Input
                type="number"
                name="duracion"
                value={form.duracion}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Responsable</Label>
              <Input
                type="text"
                name="responsable"
                placeholder="Nombre del encargado"
                value={form.responsable}
                onChange={handleChange}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
              Guardar Parada
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
