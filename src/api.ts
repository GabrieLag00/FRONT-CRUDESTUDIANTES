import axios from 'axios';

export interface Student {
    id: number;
    name: string;
    age: number;
    isStudent: boolean;
    address: string;
    hobbies: string; // Cambiado a string
}

const BASE_URL = 'https://localhost:7232/api/students';

// Obtener todos los estudiantes
export async function getStudents() {
    const response = await axios.get<Student[]>(BASE_URL);
    return response.data;
}

// Agregar un estudiante
export async function addStudent(student: Omit<Student, 'id'>) {
    const response = await axios.post<Student>(BASE_URL, student);
    return response.data;
}

// Eliminar un estudiante
export async function deleteStudent(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}?id=${id}`);  // Cambia a query param
    console.log('Response status:', response.status);
  } catch (error: any) {
    console.error('Error al eliminar el estudiante:', error.response?.data || error.message);
    throw new Error('Error al eliminar el estudiante');
  }
}


// Editar un estudiante
export async function updateStudent(id: number, student: Omit<Student, 'id'>) {
    try {
        const response = await axios.put<Student>(`${BASE_URL}/${id}`, student);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el estudiante');
    }
}
