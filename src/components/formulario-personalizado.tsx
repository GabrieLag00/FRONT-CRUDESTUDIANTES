'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export function FormularioPersonalizadoComponent() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [esEstudiante, setEsEstudiante] = useState(false)
  const [direccion, setDireccion] = useState('')
  const [hobbies, setHobbies] = useState<string[]>([])
  const [datosEnviados, setDatosEnviados] = useState<any>(null)

  const listaHobbies = ['Lectura', 'Deportes', 'Música', 'Viajes', 'Cocina']

  const handleHobbiesChange = (hobby: string) => {
    setHobbies(prev => 
      prev.includes(hobby)
        ? prev.filter(h => h !== hobby)
        : [...prev, hobby]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const datos = { nombre, edad, esEstudiante, direccion, hobbies }
    setDatosEnviados(datos)
    console.log('Datos enviados:', datos)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <Label htmlFor="edad">Edad</Label>
          <Input
            id="edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Tu edad"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="esEstudiante"
            checked={esEstudiante}
            onCheckedChange={(checked) => setEsEstudiante(checked as boolean)}
          />
          <Label htmlFor="esEstudiante">¿Eres estudiante?</Label>
        </div>

        <div>
          <Label htmlFor="direccion">Dirección</Label>
          <Textarea
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Tu dirección completa"
          />
        </div>

        <div>
          <Label>Hobbies</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {listaHobbies.map((hobby) => (
              <div key={hobby} className="flex items-center space-x-2">
                <Checkbox
                  id={hobby}
                  checked={hobbies.includes(hobby)}
                  onCheckedChange={() => handleHobbiesChange(hobby)}
                />
                <Label htmlFor={hobby}>{hobby}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit">Enviar</Button>
      </form>

      {datosEnviados && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Datos enviados:</h2>
          <pre>{JSON.stringify(datosEnviados, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}