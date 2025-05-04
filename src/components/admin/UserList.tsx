"use client"

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowLeft, Shield, Search, Menu as MenuIcon, X } from "lucide-react";

// API Base URL
const API_BASE_URL = 'http://localhost:5001/api';

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  created: string;
  lastLogin: string;
}

export default function UserList() {
  const { user, token, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setClientLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    // Si no está autenticado, redirigir a login
    if (mounted && !isLoading && !user) {
      router.push("/login");
      return;
    }

    // Si está autenticado pero no es admin, redirigir al dashboard regular
    if (mounted && !isLoading && user && !isAdmin) {
      router.push("/dashboard");
    }
  }, [user, isLoading, isAdmin, router, mounted]);

  // Cargar los usuarios desde la API
  useEffect(() => {
    if (mounted && !isLoading && user && isAdmin) {
      fetchUsers();
    }
  }, [mounted, isLoading, user, isAdmin, token]);

  // Filtrar usuarios basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filtered);
    }
  }, [searchTerm, allUsers]);

  const fetchUsers = async () => {
    setDataLoading(true);
    setFetchError(null);

    try {
      // Intentar obtener los usuarios desde la API
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllUsers(data.users);
        setUsers(data.users);
      } else {
        // Si hay un error, usar datos ficticios
        console.warn('Failed to fetch users from API, using fallback data');
        // Datos de respaldo
        const fallbackData: UserData[] = [
          { id: "1", username: "johndoe", email: "john@example.com", role: "user", created: "2023-01-15", lastLogin: "2023-05-22" },
          { id: "2", username: "janesmith", email: "jane@example.com", role: "user", created: "2023-02-20", lastLogin: "2023-05-21" },
          { id: "3", username: "mikebrown", email: "mike@example.com", role: "user", created: "2023-03-10", lastLogin: "2023-05-19" },
          { id: "4", username: "sarahjones", email: "sarah@example.com", role: "user", created: "2023-03-15", lastLogin: "2023-05-20" },
          { id: "5", username: "davidwilson", email: "david@example.com", role: "user", created: "2023-04-05", lastLogin: "2023-05-18" },
          { id: "6", username: "emilydavis", email: "emily@example.com", role: "user", created: "2023-04-12", lastLogin: "2023-05-17" },
          { id: "7", username: "adminuser", email: "admin@example.com", role: "admin", created: "2023-01-01", lastLogin: "2023-05-22" },
        ];
        setAllUsers(fallbackData);
        setUsers(fallbackData);
        setFetchError("No se pudieron obtener los datos reales. Mostrando datos de ejemplo.");
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Usar datos ficticios en caso de error
      const fallbackData: UserData[] = [
        { id: "1", username: "johndoe", email: "john@example.com", role: "user", created: "2023-01-15", lastLogin: "2023-05-22" },
        { id: "2", username: "janesmith", email: "jane@example.com", role: "user", created: "2023-02-20", lastLogin: "2023-05-21" },
        { id: "3", username: "mikebrown", email: "mike@example.com", role: "user", created: "2023-03-10", lastLogin: "2023-05-19" },
        { id: "4", username: "sarahjones", email: "sarah@example.com", role: "user", created: "2023-03-15", lastLogin: "2023-05-20" },
        { id: "5", username: "davidwilson", email: "david@example.com", role: "user", created: "2023-04-05", lastLogin: "2023-05-18" },
        { id: "6", username: "emilydavis", email: "emily@example.com", role: "user", created: "2023-04-12", lastLogin: "2023-05-17" },
        { id: "7", username: "adminuser", email: "admin@example.com", role: "admin", created: "2023-01-01", lastLogin: "2023-05-22" },
      ];
      setAllUsers(fallbackData);
      setUsers(fallbackData);
      setFetchError("No se pudieron obtener los datos reales. Mostrando datos de ejemplo.");
    } finally {
      setDataLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Renderizado condicional solo cuando el componente está montado
  if (!mounted) {
    return null; // No renderizamos nada durante SSR
  }

  // Una vez montado, si está cargando
  if (clientLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-black p-4 text-white">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-2 block rounded p-1 text-white hover:bg-gray-800 lg:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          <Image
            src="/media/EverlastLogo.png"
            alt="Everlast Logo"
            width={140}
            height={50}
            className="mr-2"
          />
          <h1 className="ml-4 text-xl font-bold">Admin</h1>
        </div>
        
        <div className="flex items-center">
          <p className="mr-4 hidden sm:block">
            <Shield className="mr-1 inline-block text-yellow-400" /> {user.username}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar para pantallas grandes (lg) */}
        <aside className={`fixed inset-y-0 left-0 top-[73px] z-50 transform bg-gray-800 pt-4 text-white transition-transform duration-300 lg:static lg:block lg:w-64 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Shield className="mr-2 inline-block" /> Admin Home
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="block rounded bg-gray-700 px-4 py-2 text-yellow-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-2 inline-block" /> Usuarios Registrados
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/qr-scanner"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Search className="mr-2 inline-block" /> Escanear QR
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay para cerrar el sidebar en dispositivos móviles */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Users List Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mb-4 flex flex-col items-start justify-between space-y-2 sm:mb-6 sm:flex-row sm:items-center sm:space-y-0">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Usuarios Registrados</h2>
              <p className="text-sm text-gray-600 sm:text-base">Total: {users.length} usuarios</p>
            </div>
            <Link
              href="/admin"
              className="flex items-center rounded-full border-2 border-black px-3 py-1.5 text-sm hover:bg-black hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              <ArrowLeft className="mr-2" />
              <span>Volver al Dashboard</span>
            </Link>
          </div>

          {/* Error Message */}
          {fetchError && (
            <div className="mb-4 rounded-md bg-yellow-100 p-3 text-yellow-800">
              <p>{fetchError}</p>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none sm:text-base"
              />
            </div>
          </div>

          {/* Loading State */}
          {dataLoading ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-lg text-gray-500">Cargando usuarios...</p>
            </div>
          ) : (
            /* Users Table for larger screens */
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <div className="hidden min-w-full lg:block">
                <div className="grid grid-cols-12 bg-gray-50 px-6 py-3">
                  <div className="col-span-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Usuario
                  </div>
                  <div className="col-span-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </div>
                  <div className="col-span-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rol
                  </div>
                  <div className="col-span-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Registro
                  </div>
                </div>
                <div className="divide-y divide-gray-200 bg-white">
                  {users.map((userItem) => (
                    <div key={userItem.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50">
                      <div className="col-span-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-800">
                              {userItem.username.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{userItem.username}</div>
                            <div className="text-xs text-gray-500">ID: {userItem.id}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center text-sm text-gray-500">
                        {userItem.email}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            userItem.role === "admin"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {userItem.role}
                        </span>
                      </div>
                      <div className="col-span-3 flex items-center text-xs text-gray-500">
                        {userItem.created}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card view for mobile */}
              <div className="divide-y divide-gray-200 lg:hidden">
                {users.map((userItem) => (
                  <div key={userItem.id} className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-800">
                          {userItem.username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{userItem.username}</div>
                        <div className="text-xs text-gray-500">ID: {userItem.id}</div>
                      </div>
                    </div>
                    <div className="ml-1 space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {userItem.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Rol:</span>{" "}
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            userItem.role === "admin"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {userItem.role}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Registro:</span> {userItem.created}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 