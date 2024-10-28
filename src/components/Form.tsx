import React, { Fragment, useState } from 'react'

interface Student {
    name: string;
    age: number;
    isStudent: boolean;
    address: string;
    hobbies: string[];
  }


export default function Form() {


//ESTADOS    
const [name, setName] = useState<string>('');  // string
const [age, setAge] = useState<number>(0);     // number
const [isStudent, setIsStudent] = useState<boolean>(false);  // boolean
const [address, setAddress] = useState<string>('');  // string
const [hobbies, setHobbies] = useState<string>('') 
const [students, setStudents] = useState<Student[]>([]);



// Función para manear elformulario
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  //Funcion para agregar nuevos alumnos a el objeto
    const newStudent: Student = {
        name,
        age,
        isStudent,
        address,
        hobbies: hobbies.split(',').map(hobby => hobby.trim()), // Convertir hobbies en array
    }

    setStudents([...students, newStudent])
  
  // Limpiar el formulario
  setName('');
  setAge(0);
  setIsStudent(false);
  setAddress('');
  setHobbies('');
};

return (
    <Fragment>
      <section>
        <form onSubmit={handleSubmit}>
          {/* String (nombre) */}
          <article>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </article>

          {/* Number (edad) */}
          <article>
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </article>

          {/* Boolean (es estudiante) */}
          <article>
            <label htmlFor="isStudent">¿Es estudiante?</label>
            <input
              type="checkbox"
              id="isStudent"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
            />
          </article>

          {/* String (dirección) */}
          <article>
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </article>

          {/* Hobbies como string */}
          <article>
            <label htmlFor="hobbies">Hobbies (separados por comas):</label>
            <input
              type="text"
              id="hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
          </article>

          {/* Botón para agregar estudiante */}
          <button type="submit">Agregar Alumno</button>
        </form>

        {/* Mostrar la lista de estudiantes */}
        <section>
          <h2>Lista de alumnos</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {student.name} <br />
                <strong>Edad:</strong> {student.age} <br />
                <strong>Es estudiante:</strong> {student.isStudent ? 'Sí' : 'No'} <br />
                <strong>Dirección:</strong> {student.address} <br />
                <strong>Hobbies:</strong> {student.hobbies.join(', ')} <br />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </Fragment>
  );
}