import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserPlus, ChevronRight,BookCheck } from "lucide-react";

export function NavbarComponent() {
  const location = useLocation(); // Hook para obtener la ruta actual
  const pathname = location.pathname; // La ruta actual

  // Rutas definidas
  const routes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Add Students", path: "/contact", icon: UserPlus },
    { name: "Tasks", path: "/to-do", icon: BookCheck},
    { name: "Memo", path: "/useMemo", icon: BookCheck},
    { name: "Callback", path: "/useCallback", icon: BookCheck},
    { name: "Reducer", path: "/useReducer", icon: BookCheck},
  ];

  // Encontrar el índice de la página actual
  const currentPageIndex = routes.findIndex((route) => route.path === pathname);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Enlace para la página de inicio */}
              <Link to="/" className="text-xl font-bold text-primary">
                Student System
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === route.path
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <route.icon className="w-4 h-4 mr-2" />
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          {/* Navegación Breadcrumbs */}
          {routes.slice(0, currentPageIndex + 1).map((route, index) => (
            <React.Fragment key={route.path}>
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              <Link
                to={route.path}
                className={`hover:text-primary ${
                  index === currentPageIndex ? "text-primary font-medium" : ""
                }`}
              >
                {route.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
