'use client'

import React, { useReducer, useMemo, useCallback, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, CheckCircle, PlusCircle, ClipboardList, CheckSquare, Calendar, Clock } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"


//interfaz
interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

//el tipo, aqui las acciones
type Action = 
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number };

//Estado
const initialState: Task[] = [];


//la funcion con reducer
const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, completed: false, createdAt: new Date() }];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TaskPages: React.FC = () => {
  //el estado con la funciono y el estado inicial
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  //los estados para las tareas
  const [newTask, setNewTask] = useState('');
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);


  //agregar 
  const addTask = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text });
      setNewTask('');
    }
  }, [dispatch]);
  // selccion con checkbox, para marcar
  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, [dispatch]);

  //eliminar
  const deleteTask = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
    setTaskToDelete(null);
  }, [dispatch]);


  //contador con usememo
  const completedTaskCount = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  //las tareas completadas
  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.completed);
  }, [tasks]);
  //las pendientes
  const pendingTasks = useMemo(() => {
    return tasks.filter(task => !task.completed);
  }, [tasks]);

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <Card className={`mb-4 ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "line-through text-gray-500" : "font-medium"}>
              {task.text}
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setTaskToDelete(task.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Seguro que quieres eliminar esta tarea? Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTask(task.id)}>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-3 w-3" />
          <span>{task.createdAt.toLocaleDateString()}</span>
        </div>
        <Badge variant={task.completed ? "success" : "secondary"}>
          {task.completed ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
          {task.completed ? "Completada" : "Pendiente"}
        </Badge>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <ClipboardList className="mr-2 h-6 w-6 text-primary" />
            Lista de Tareas
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Agregar nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask(newTask);
                }
              }}
            />
            <Button onClick={() => addTask(newTask)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Agregar Tarea
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 mb-8">
        <CardContent className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Total de Tareas Completadas:
          </span>
          <span className="text-2xl font-bold">{completedTaskCount}</span>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-500" />
              Tareas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {pendingTasks.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No hay tareas pendientes</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-green-500" />
              Tareas Completadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {completedTasks.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No hay tareas completadas</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default TaskPages