"use client"

import Image from "next/image"
import Link from "next/link"

export default function MuppiQrCode() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image con menor opacidad para que destaque más el QR */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/boxing-background.jpg"
          alt="Boxing background"
          fill
          className="object-cover object-center brightness-30 opacity-40"
          priority
        />
      </div>

      <div className="relative z-10 flex h-screen w-full flex-col items-center">
        {/* Logo Everlast en la parte superior */}
        <div className="mt-12 w-[180px]">
          <Image
            src="/media/EverlastLogo.png"
            alt="Everlast Logo"
            width={180}
            height={70}
            className="w-full"
            priority
          />
        </div>
        
        {/* Título y QR */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold leading-tight text-white italic">
            Scan me and try your<br />strength
          </h2>
          
          {/* QR Code */}
          <div className="mx-auto mb-8 bg-white p-5">
            <div className="relative h-[280px] w-[280px]">
              <Image
                src="/media/qr-placeholder.png"
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Botón para volver al leaderboard */}
        <div className="mb-8">
          <Link 
            href="/muppi" 
            className="rounded-full border-2 border-yellow-500 bg-black/50 px-6 py-3 font-bold text-white hover:bg-yellow-500 hover:text-black"
          >
            Back to Leaderboard
          </Link>
        </div>
      </div>
    </main>
  )
} 