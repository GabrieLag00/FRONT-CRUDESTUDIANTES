import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Ajusta según tu estructura
import { Button } from "@/components/ui/button"; // Ajusta según tu estructura
import { Link, useNavigate } from "react-router-dom"; // Ajustado para React Router DOM
import { BookOpen, GraduationCap, Users, ClipboardList } from "lucide-react";

const HomePages: React.FC = () => {

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/contact'); // Redirige a /contact
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Bienvenido al Sistema de Registro Estudiantil
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Gestiona fácilmente la información de tus estudiantes y mantén un registro actualizado de sus datos.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Button size="lg" className="w-full" onClick={handleRegisterClick}>
                  Registrar Nuevo Estudiante
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Gestión de Estudiantes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Administra los perfiles de los estudiantes, incluyendo información personal y académica.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to="/add-students">
                    <Button variant="outline" className="w-full">Ver Más</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Registro de Cursos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Mantén un registro de los cursos ofrecidos y las inscripciones de los estudiantes.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Próximamente</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ClipboardList className="h-6 w-6 text-primary" />
                    <span>Seguimiento Académico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Realiza un seguimiento del progreso académico de los estudiantes y genera informes.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Próximamente</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              ¿Por qué elegir nuestro Sistema de Registro Estudiantil?
            </h2>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                          <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Fácil de Usar</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Interfaz intuitiva que permite a los administradores y profesores gestionar la información de los estudiantes sin complicaciones.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                          <Users className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Centralizado</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Toda la información de los estudiantes en un solo lugar, facilitando el acceso y la gestión de datos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                          <ClipboardList className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Informes Detallados</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Genera informes completos sobre el rendimiento y la información de los estudiantes para una mejor toma de decisiones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-base text-gray-500">
            © 2023 Sistema de Registro Estudiantil. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePages;
