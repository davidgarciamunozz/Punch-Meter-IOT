"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { QrCode } from "lucide-react"

// Datos ficticios para el leaderboard
const dummyLeaderboardData = [
  { rank: 1, name: "John Doe", score: "650N" },
  { rank: 2, name: "Jane Smith", score: "620N" },
  { rank: 3, name: "Mike Johnson", score: "590N" },
  { rank: 4, name: "Sarah Williams", score: "580N" },
  { rank: 5, name: "Robert Brown", score: "570N" },
  { rank: 6, name: "Emily Davis", score: "550N" },
  { rank: 7, name: "David Wilson", score: "540N" },
  { rank: 8, name: "Jennifer Martinez", score: "530N" },
  { rank: 9, name: "Michael Thompson", score: "520N" },
  { rank: 10, name: "Lisa Anderson", score: "510N" },
];

export default function MuppiLeaderboard() {
  // Estado para controlar la actualización de datos
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Actualizar la fecha cada minuto para mostrar la hora actual
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
            href="/muppi/qr" 
            className="flex items-center rounded-full border-2 border-yellow-500 px-4 py-2 text-white hover:bg-yellow-500 hover:text-black"
          >
            <QrCode className="mr-2" />
            <span>Scan QR</span>
          </Link>
        </div>

        {/* Date and Current Leaderboard */}
        <div className="mb-8 px-8">
          <div className="mb-2 flex justify-between">
            <h2 className="text-3xl font-bold text-white">TOP PUNCHES</h2>
            <p className="text-xl text-gray-300">{formattedDate}</p>
          </div>
          <p className="text-lg text-yellow-500">Today&apos;s strongest punches</p>
        </div>

        {/* Leaderboard Table */}
        <div className="mx-auto max-w-5xl rounded-lg border border-gray-700 bg-black/60 px-6 py-6 backdrop-blur-sm">
          <div className="mb-4 grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 text-lg font-bold text-gray-300">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Name</div>
            <div className="col-span-3 text-right">Force</div>
          </div>

          {dummyLeaderboardData.map((player) => (
            <div 
              key={player.rank}
              className={`grid grid-cols-12 gap-4 border-b border-gray-700/50 py-4 text-lg ${
                player.rank === 1 
                  ? "text-yellow-300" 
                  : player.rank === 2 
                  ? "text-gray-300" 
                  : player.rank === 3 
                  ? "text-yellow-600" 
                  : "text-white"
              }`}
            >
              <div className="col-span-2 text-center font-bold">
                {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
              </div>
              <div className="col-span-7 font-medium">{player.name}</div>
              <div className="col-span-3 text-right font-bold">{player.score}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center text-gray-400 backdrop-blur-sm">
          <p>Scan the QR code to join and register your own punch</p>
        </div>
      </div>
    </main>
  )
} 