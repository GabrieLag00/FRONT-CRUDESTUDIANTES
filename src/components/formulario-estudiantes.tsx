'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserIcon, BookOpenIcon, HomeIcon, HeartIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { getStudents, addStudent, deleteStudent, updateStudent, Student } from '@/api.ts';
import { toast, Toaster } from 'react-hot-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

export function FormularioEstudiantesComponent() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [hobbies, setHobbies] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      console.error('Edad no válida');
      return;
    }
  
    const studentData = {
      name,
      age: parsedAge,
      isStudent,
      address,
      hobbies
    };
  
    try {
      const addedStudent = await addStudent(studentData);
      setStudents([...students, addedStudent]);
      resetForm();
      toast.success("Estudiante agregado correctamente.");
    } catch (error) {
      console.error('Error agregando estudiante:', error);
      toast.error("Hubo un problema al agregar el estudiante.");
    }
  };
  
  const resetForm = () => {
    setName('');
    setAge('');
    setIsStudent(false);
    setAddress('');
    setHobbies('');
  };
  
  const handleDelete = async (id: number) => {
      try {
        await deleteStudent(id);  
        setStudents(students.filter(student => student.id !== id));  
        toast.success("Estudiante eliminado correctamente.");
      } catch (error) {
        console.error('Error eliminando estudiante:', error);
        toast.error("Hubo un problema al eliminar el estudiante.");
      }
  };
  
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setName(student.name);
    setAge(student.age.toString());
    setIsStudent(student.isStudent);
    setAddress(student.address);
    setHobbies(student.hobbies); // Simplificado
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
  
    const updatedStudent = {
      ...editingStudent,
      name,
      age: Number(age),
      isStudent,
      address,
      hobbies
    };
  
    try {
      await updateStudent(editingStudent.id, updatedStudent);  // Pasamos el id por separado
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
      setEditingStudent(null);
      resetForm();
      toast.success("Estudiante actualizado correctamente.");
    } catch (error) {
      console.error('Error actualizando estudiante:', error);
      toast.error("Hubo un problema al actualizar el estudiante.");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsData = await getStudents();
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{editingStudent ? 'Editar Estudiante' : 'Formulario de Estudiante'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingStudent ? handleUpdate : handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre:</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Edad:</Label>
                <Input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isStudent"
                  checked={isStudent}
                  onCheckedChange={setIsStudent}
                />
                <Label htmlFor="isStudent">¿Es estudiante?</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección:</Label>
                <Input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hobbies">Hobbies (separados por comas):</Label>
                <Input
                  type="text"
                  id="hobbies"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                {editingStudent ? 'Actualizar Alumno' : 'Agregar Alumno'}
              </Button>
              {editingStudent && (
                <Button type="button" onClick={() => setEditingStudent(null)} className="w-full mt-2" variant='destructive'>
                  Cancelar Edición
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Lista de Alumnos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              {students.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {students.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <UserIcon className="h-12 w-12 text-blue-600" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                              <p className="text-sm text-gray-500">Edad: {student.age}</p>
                            </div>
                          </div>
                          <div className="space-y-1 mb-4">
                            <p className="flex items-center text-sm text-gray-600">
                              <BookOpenIcon className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{student.isStudent ? 'Estudiante' : 'No estudiante'}</span>
                            </p>
                            <p className="flex items-center text-sm text-gray-600">
                              <HomeIcon className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{student.address}</span>
                            </p>
                            <p className="flex items-center text-sm text-gray-600">
                              <HeartIcon className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{Array.isArray(student.hobbies) ? student.hobbies.join(', ') : student.hobbies}</span>
                            </p>
                          </div>
                          <div className="flex justify-between mt-4 space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => handleEdit(student)}
                              className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100"
                            >
                              <PencilIcon className="h-4 w-4 mr-2" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="flex-1 bg-red-50 text-red-600 hover:bg-red-100">
                                  <Trash2Icon className="h-4 w-4 mr-2" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl font-bold text-gray-900">¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600 mt-2">
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente al estudiante.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-6 flex justify-end space-x-4">
                                  <AlertDialogCancel className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      console.log('Estudiante a eliminar:', student.id);
                                      handleDelete(student.id);
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No hay alumnos registrados.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
}