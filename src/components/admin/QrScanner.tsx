"use client"

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, QrCode, ArrowLeft, Users, User } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner() {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader";

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

  useEffect(() => {
    // Cleanup scanner when component unmounts
    return () => {
      if (scannerRef.current && scanning) {
        scannerRef.current.stop();
      }
    };
  }, [scanning]);

  const startScanner = () => {
    setScanError(null);
    setScannedResult(null);
    setScanning(true);

    try {
      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // QR code detected and decoded successfully
          setScannedResult(decodedText);
          html5QrCode.stop();
          setScanning(false);
        },
        (errorMessage) => {
          // Error while scanning
          console.log(errorMessage);
        }
      ).catch((err) => {
        setScanError(`Error al iniciar el escáner: ${err}`);
        setScanning(false);
      });
    } catch (error) {
      setScanError(`Error al configurar el escáner: ${error}`);
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setScanning(false);
      }).catch(error => {
        console.error('Error stopping scanner:', error);
      });
    }
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
          <Image
            src="/media/EverlastLogo.png"
            alt="Everlast Logo"
            width={140}
            height={50}
            className="mr-2"
          />
          <h1 className="ml-4 text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center">
          <p className="mr-4">
            <Shield className="mr-1 inline-block text-yellow-400" /> {user.username}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                >
                  <Shield className="mr-2 inline-block" /> Admin Home
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                >
                  <Users className="mr-2 inline-block" /> Usuarios Registrados
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/qr-scanner"
                  className="block rounded bg-gray-700 px-4 py-2 text-yellow-400"
                >
                  <QrCode className="mr-2 inline-block" /> Escanear QR
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* QR Scanner Content */}
        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Escanear QR de Jugadores</h2>
              <p className="text-gray-600">Escanea el código QR de los jugadores para registrar su actividad o verificar su identidad</p>
            </div>
            <Link
              href="/admin"
              className="flex items-center rounded-full border-2 border-black px-4 py-2 hover:bg-black hover:text-white"
            >
              <ArrowLeft className="mr-2" />
              <span>Volver al Dashboard</span>
            </Link>
          </div>

          {/* Scanner Container */}
          <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex flex-col items-center justify-center">
              <QrCode size={48} className="mb-2 text-blue-600" />
              <h3 className="text-xl font-semibold">Escáner QR de Jugadores</h3>
              <p className="text-center text-gray-600">
                Posiciona el código QR de un jugador frente a la cámara para escanearlo y gestionar su información
              </p>
            </div>

            {scanError && (
              <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
                <p>{scanError}</p>
              </div>
            )}

            {scannedResult && (
              <div className="mb-4 rounded-md bg-green-100 p-4 text-green-700">
                <p className="font-semibold">Código de jugador escaneado correctamente:</p>
                <p className="mt-1 break-all font-mono">{scannedResult}</p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => alert(`Ver información del jugador con ID: ${scannedResult}`)}
                    className="flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                  >
                    <User className="mr-1.5 h-4 w-4" />
                    Ver información del jugador
                  </button>
                </div>
              </div>
            )}

            {/* Scanner Element */}
            <div className="mb-4 overflow-hidden rounded-lg">
              <div id={scannerContainerId} className="h-72 w-full"></div>
            </div>

            <div className="flex justify-center space-x-4">
              {!scanning ? (
                scannedResult ? (
                  <button
                    onClick={() => {
                      setScannedResult(null);
                      setScanError(null);
                    }}
                    className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    <QrCode className="mr-2" />
                    Escanear otro código
                  </button>
                ) : (
                  <button
                    onClick={startScanner}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    <QrCode className="mr-2" />
                    Iniciar Escáner
                  </button>
                )
              ) : (
                <button
                  onClick={stopScanner}
                  className="flex items-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  <QrCode className="mr-2" />
                  Detener Escáner
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 