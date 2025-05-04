"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trophy } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// Estados posibles del juego
type GameState = "preparing" | "countdown" | "punching" | "recording" | "result";

export default function GameCountdown() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  // Estado del juego
  const [gameState, setGameState] = useState<GameState>("preparing");
  // Contador de golpes (máximo 3)
  const [punchCount, setPunchCount] = useState<number>(0);
  // Fuerza del golpe actual
  const [currentPunchStrength, setCurrentPunchStrength] = useState<number | null>(null);
  // Historial de golpes
  const [punchHistory, setPunchHistory] = useState<number[]>([]);
  // Contador para preparación (3, 2, 1...)
  const [prepCount, setPrepCount] = useState<number>(3);
  // Contador de montado para SSR
  const [mounted, setMounted] = useState(false);

  // Marcar como montado para evitar problemas de SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router, mounted]);

  // Manejar la preparación inicial (3, 2, 1...)
  useEffect(() => {
    if (gameState !== "preparing" || prepCount <= 0) return;

    const timer = setTimeout(() => {
      if (prepCount > 1) {
        setPrepCount(prepCount - 1);
      } else {
        // Cambiar al estado de cuenta regresiva
        setGameState("countdown");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [prepCount, gameState]);

  // Simular el golpe (esto se reemplazaría por el sensor real)
  const simulatePunch = () => {
    // Simulamos un golpe entre 500 y 1000 unidades de fuerza
    const punchStrength = Math.floor(Math.random() * 500) + 500;
    
    // Guardar el golpe actual
    setCurrentPunchStrength(punchStrength);
    // Añadir al historial
    setPunchHistory([...punchHistory, punchStrength]);
    
    // Incrementar contador de golpes
    setPunchCount(punchCount + 1);
    
    // Cambiar al estado de grabación (animación)
    setGameState("recording");

    // Después de 2 segundos, mostrar el resultado
    setTimeout(() => {
      setGameState("result");
    }, 2000);
  };

  // Manejar el siguiente golpe o finalizar
  const handleNextAction = () => {
    if (punchCount >= 3) {
      // Redirigir al leaderboard
      router.push("/dashboard/leaderboard");
    } else {
      // Reiniciar para el siguiente golpe
      setCurrentPunchStrength(null);
      setPrepCount(3);
      setGameState("preparing");
    }
  };

  // Mostrar pantalla de carga durante SSR
  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-black">
      {/* Botón de regreso (visible solo en preparación) */}
      {gameState === "preparing" && prepCount === 3 && (
        <div className="relative z-10 p-4">
          <Link href="/dashboard/game-mode" className="flex w-fit items-center text-white hover:text-yellow-500">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Game Mode
          </Link>
        </div>
      )}

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        {/* Logo superior */}
        <div className="mb-8 w-full max-w-[160px]">
          <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={160} height={60} className="w-full" />
        </div>

        {/* Contenido principal */}
        <div className="w-full max-w-md rounded-xl border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          {/* Contador de golpes */}
          <div className="mb-4 flex justify-between">
            <span className="text-white">Punch: {punchCount + 1}/3</span>
            <span className="text-yellow-500 font-bold">
              {punchHistory.length > 0 && `Best: ${Math.max(...punchHistory)}`}
            </span>
          </div>

          {/* Estado: Preparación */}
          {gameState === "preparing" && (
            <div className="flex flex-col items-center">
              <h2 className="mb-8 text-2xl font-bold text-white">Get Ready!</h2>
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-800 text-5xl font-bold text-white">
                {prepCount}
              </div>
              <p className="mt-8 text-center text-lg text-gray-300">
                Prepare to punch in...
              </p>
            </div>
          )}

          {/* Estado: Cuenta regresiva de 15 segundos */}
          {gameState === "countdown" && (
            <div className="flex flex-col items-center">
              <h2 className="mb-6 text-2xl font-bold text-white">Punch Now!</h2>
              <CountdownTimer
                seconds={15}
                onComplete={() => setGameState("punching")}
                size={220}
              />
              <p className="mt-6 text-center text-lg text-gray-300">
                Hit the sensor as hard as you can!
              </p>
              {/* Botón para simular el golpe (en producción, esto sería el sensor) */}
              <button
                onClick={simulatePunch}
                className="mt-6 rounded-full bg-yellow-500 px-8 py-3 text-lg font-bold text-black hover:bg-yellow-400"
              >
                Simular Golpe
              </button>
            </div>
          )}

          {/* Estado: Grabando el golpe */}
          {gameState === "recording" && (
            <div className="flex flex-col items-center">
              <h2 className="mb-8 text-2xl font-bold text-white">Recording...</h2>
              <div className="h-40 w-40 animate-pulse rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">Recording</span>
              </div>
              <p className="mt-8 text-center text-lg text-gray-300">
                Processing your punch...
              </p>
            </div>
          )}

          {/* Estado: Resultado */}
          {gameState === "result" && currentPunchStrength && (
            <div className="flex flex-col items-center">
              <h2 className="mb-6 text-2xl font-bold text-white">Punch Result!</h2>
              
              <div className="mb-6 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-yellow-500">
                <span className="text-4xl font-bold text-black">{currentPunchStrength}</span>
                <span className="text-sm font-medium text-black">FORCE</span>
              </div>
              
              <div className="mb-8 flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                <span className="text-lg text-white">
                  {punchCount < 2 ? "You have more punches!" : "Final punch!"}
                </span>
              </div>

              <button
                onClick={handleNextAction}
                className="rounded-full bg-yellow-500 px-8 py-3 text-lg font-bold text-black hover:bg-yellow-400"
              >
                {punchCount >= 3 ? "See Leaderboard" : "Next Punch"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 