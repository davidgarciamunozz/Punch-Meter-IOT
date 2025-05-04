"use client"

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
  size?: number;
  strokeWidth?: number;
}

export default function CountdownTimer({
  seconds,
  onComplete,
  size = 200,
  strokeWidth = 12,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  
  // Radio del círculo
  const radius = (size - strokeWidth) / 2;
  // Circunferencia
  const circumference = radius * 2 * Math.PI;
  // Calcular el progreso de la animación
  const strokeDashoffset = circumference - (timeLeft / seconds) * circumference;

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 0.1);
    }, 100);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete, seconds]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Círculo SVG */}
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Círculo de fondo (gris) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth={strokeWidth}
        />
        
        {/* Círculo animado (amarillo) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F59E0B" // Amarillo
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      
      {/* Tiempo restante en el centro */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-white">
          {Math.ceil(timeLeft)}
        </span>
        <span className="text-sm text-gray-300">segundos</span>
      </div>
    </div>
  );
} 