"use client"

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, QrCode, LogOut, Shield, Menu as MenuIcon, X } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
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

  const handleLogout = () => {
    logout();
    router.push("/login");
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
          <button
            onClick={handleLogout}
            className="flex items-center rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            <LogOut size={16} className="mr-1" /> <span className="hidden sm:inline">Logout</span>
          </button>
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
                  className="block rounded px-4 py-2 text-yellow-400 hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Shield className="mr-2 inline-block" /> Admin Home
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
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
                  <QrCode className="mr-2 inline-block" /> Escanear QR
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

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">Panel de Administración</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {/* Users Card */}
            <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
              <div className="mb-4 flex items-center">
                <Users className="mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold sm:text-xl">Usuarios</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600 sm:text-base">Gestiona los usuarios registrados en la plataforma.</p>
              <Link
                href="/admin/users"
                className="inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 sm:px-4 sm:py-2 sm:text-base"
              >
                Ver Usuarios
              </Link>
            </div>
            
            {/* QR Scanner Card */}
            <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
              <div className="mb-4 flex items-center">
                <QrCode className="mr-2 text-green-600" />
                <h3 className="text-lg font-semibold sm:text-xl">Escáner QR de Jugadores</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600 sm:text-base">Escanea los códigos QR de los jugadores para registrar su actividad o verificar su identidad.</p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Link
                  href="/admin/qr-scanner"
                  className="inline-flex items-center justify-center rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 sm:px-4 sm:py-2 sm:text-base"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Ir al Escáner
                </Link>
                <button 
                  onClick={() => window.open('/admin/qr-scanner', '_blank')}
                  className="inline-flex items-center justify-center rounded border border-green-600 bg-white px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 sm:px-4 sm:py-2 sm:text-base"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Abrir en nueva ventana
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 