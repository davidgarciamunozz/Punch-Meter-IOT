"use client"

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, Trophy, GamepadIcon, Home, LogOut, QrCode, Shield } from "lucide-react";

export default function Dashboard() {
  const { user, logout, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setClientLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login");
    }

    // Si el usuario es administrador, redirigirlo automáticamente al panel de administración
    if (mounted && !isLoading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, isLoading, isAdmin, router, mounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
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

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <main className="relative min-h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/boxing-background.jpg"
          alt="Boxer background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 flex items-center justify-between bg-black/70 px-4 py-3 backdrop-blur-sm md:px-8">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-8">
            <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={120} height={50} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" className="flex items-center text-white hover:text-yellow-500">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center text-white hover:text-yellow-500">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link href="/dashboard/leaderboard" className="flex items-center text-white hover:text-yellow-500">
              <Trophy className="mr-2 h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
            <Link href="/dashboard/game-mode" className="flex items-center text-white hover:text-yellow-500">
              <GamepadIcon className="mr-2 h-4 w-4" />
              <span>Game Mode</span>
            </Link>
            <Link href="/dashboard/qr-id" className="flex items-center text-white hover:text-yellow-500">
              <QrCode className="mr-2 h-4 w-4" />
              <span>QR Code</span>
            </Link>
            {isAdmin && (
              <>
                <Link href="/admin" className="flex items-center text-yellow-500 hover:text-yellow-300">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
                <Link href="/admin/qr-scanner" className="flex items-center text-yellow-500 hover:text-yellow-300">
                  <QrCode className="mr-2 h-4 w-4" />
                  <span>Scan QR</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-white hover:bg-gray-800 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-4 py-2">
            <Link
              href="/dashboard"
              className="flex items-center border-b border-gray-800 py-3 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-3 h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center border-b border-gray-800 py-3 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="mr-3 h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/leaderboard"
              className="flex items-center border-b border-gray-800 py-3 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="mr-3 h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            <Link
              href="/dashboard/game-mode"
              className="flex items-center border-b border-gray-800 py-3 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <GamepadIcon className="mr-3 h-5 w-5" />
              <span>Game Mode</span>
            </Link>
            <Link
              href="/dashboard/qr-id"
              className="flex items-center border-b border-gray-800 py-3 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <QrCode className="mr-3 h-5 w-5" />
              <span>QR Code</span>
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center border-b border-gray-800 py-3 text-yellow-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  <span>Admin Panel</span>
                </Link>
                <Link
                  href="/admin/qr-scanner"
                  className="flex items-center border-b border-gray-800 py-3 text-yellow-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <QrCode className="mr-3 h-5 w-5" />
                  <span>Scan QR</span>
                </Link>
              </>
            )}
            <button 
              className="flex items-center py-3 text-red-500" 
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 px-4 py-6 mt-6 md:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Welcome, {user.username}!</h1>
          <p className="mt-4 text-xl text-gray-300">Your boxing dashboard is coming soon.</p>
          
          <div className="mt-16 rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm md:mx-auto md:max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold text-white">Your Profile</h2>
            <div className="text-left">
              <p className="mb-2 text-gray-300"><span className="font-bold">Username:</span> {user.username}</p>
              <p className="mb-2 text-gray-300"><span className="font-bold">Email:</span> {user.email}</p>
              {isAdmin && (
                <p className="mb-2 text-yellow-400">
                  <Shield className="mr-1 inline-block h-4 w-4" />
                  <span className="font-bold">Admin Access</span>
                </p>
              )}
            </div>
            {isAdmin && (
              <div className="mt-4 flex flex-wrap gap-3">
                <Link 
                  href="/admin" 
                  className="inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Access Admin Panel
                </Link>
                <Link 
                  href="/admin/qr-scanner" 
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan Player QR
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 