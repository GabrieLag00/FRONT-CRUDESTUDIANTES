import React, {useReducer} from "react"
import {FormularioEstudiantesComponent } from '@/components/formulario-estudiantes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"





interface State {
  count: number;
}

// Definir los tipos de acción
type Action = 
  | { type: 'increment' } 
  | { type: 'decrement' };


const initialState = { count: 0};

// Reducer con tipado adecuado
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error("Acción no reconocida");
  }
}


const ContactPages: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center text-black">
              Registro de Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <FormularioEstudiantesComponent />
          </CardContent>
        </Card>
        <div>
		      <p>Count: {state.count}</p>
		      <button onClick={() => dispatch({type: 'increment'})}> + </button>
		      <button onClick={() => dispatch({type: 'decrement'})}> - </button>
	      </div>
        <footer className="mt-8 text-center text-sm text-gray-500">
          © 2023 Sistema de Registro de Estudiantes. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}

export default ContactPages