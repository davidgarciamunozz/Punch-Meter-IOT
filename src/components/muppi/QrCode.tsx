"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MuppiQrCode() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Actualizar la fecha cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Formatea la fecha para mostrar
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(currentDate);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/boxing-background.jpg"
          alt="Boxing background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
      </div>

      <div className="relative z-10 h-full w-full">
        {/* Header with Logo */}
        <div className="mb-6 flex items-center justify-between bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex items-center">
            <Image
              src="/media/EverlastLogo.png"
              alt="Everlast Logo"
              width={180}
              height={70}
              className="mr-4"
            />
          </div>
          
          <Link 
            href="/muppi" 
            className="flex items-center text-white hover:text-yellow-500"
          >
            <ArrowLeft className="mr-2" />
            <span>Back to Leaderboard</span>
          </Link>
        </div>

        {/* QR Code Section */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Scan this code to access Punch Meter</h2>
          <p className="mb-8 text-xl text-gray-300">Use your phone&apos;s camera to scan the QR code below</p>
          
          <div className="mx-auto mb-8 flex w-72 flex-col items-center justify-center rounded-lg border-4 border-yellow-500 bg-white p-4 md:w-80 lg:w-96">
            {/* Ejemplo de QR Code usando una imagen */}
            <div className="relative h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
              <Image
                src="/media/qr-placeholder.png"
                alt="QR Code to access Punch Meter"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <p className="text-lg text-white">
            Or visit <span className="font-bold text-yellow-500">www.punchmeter.com</span>
          </p>
          
          <div className="mt-8">
            <p className="text-lg text-gray-300">{formattedDate}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center text-gray-400 backdrop-blur-sm">
          <p>Track your punch strength and compete with others!</p>
        </div>
      </div>
    </main>
  )
} 