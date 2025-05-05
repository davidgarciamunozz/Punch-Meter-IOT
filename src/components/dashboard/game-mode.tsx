"use client"

// import Image from "next/image"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User, AlertTriangle } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function GameMode() {
  const { user } = useAuth();
  const userId = user?.id || "user-123456";

  return (
    <main className="relative min-h-screen w-full bg-black">
      {/* Background Image
      <div className="absolute inset-0 z-0">
        <Image
          src="/boxer-background.jpg"
          alt="Boxer background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
      </div> */}

      {/* Back Button */}
      <div className="relative z-10 p-4">
        <Link href="/dashboard" className="flex w-fit items-center text-white hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto md:max-w-5xl px-4 py-6 md:px-8">
        {/* Logo - Centrado en móvil, alineado a la izquierda en desktop */}
        <div className="flex justify-center md:justify-start mb-8">
          <div className="w-[180px]">
            <Image 
              src="/media/EverlastLogo.png" 
              alt="Everlast Logo" 
              width={180} 
              height={45}
              className="w-full" 
            />
          </div>
        </div>

        <div className="md:flex md:gap-6">
          {/* Left Column - Game Mode */}
          <div className="mb-6 md:mb-0 md:w-1/2">
            <div className="rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
              <h1 className="mb-6 text-center md:text-left text-2xl font-bold text-white">Game Mode</h1>

              <div className="space-y-4">
                <Link href="/dashboard/game-mode/individual">
                  <div className="flex cursor-pointer items-center rounded-lg border border-gray-700 bg-black/60 p-4 transition-colors hover:border-yellow-500 hover:bg-black/80">
                    <div className="mr-4 rounded-full bg-yellow-500 p-3">
                      <User className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Individual</h3>
                      <p className="text-sm text-gray-300">3 punches to test your strength</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-6">
                <h2 className="mb-4 text-xl font-bold text-white">How to Play</h2>

                <ol className="list-decimal space-y-2 pl-5 text-white">
                  <li>Show your QR code to the admin to start the game</li>
                  <li>When it&apos;s your turn, hit the device hard but carefully</li>
                  <li>You&apos;ll have 15 seconds to deliver your punch</li>
                  <li>Check your results and see how you rank!</li>
                </ol>

                <div className="mt-4 rounded-lg bg-yellow-500/20 p-3">
                  <p className="text-sm text-yellow-300">
                    Remember: The best punches win Everlast prizes! Make sure to give it your best shot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="md:w-1/2">
            <div className="rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Your QR Code</h2>
                <div className="rounded-full bg-yellow-500/20 px-3 py-1">
                  <p className="text-xs text-yellow-300">ID: {userId.substring(0, 8)}</p>
                </div>
              </div>

              {/* QR Code Display */}
              <div className="flex flex-col items-center">
                <div className="mb-6 h-64 w-64 p-2 rounded-lg">
                  <Image 
                    src="/media/qr.png" 
                    alt="Your QR Code" 
                    width={240} 
                    height={240}
                    className="w-full h-full"
                  />
                </div>

                <p className="mb-4 text-center text-base text-white italic">
                  Show this QR code to start the game
                </p>

                {/* Disclaimer */}
                <div className="w-full rounded-lg border border-yellow-600 bg-yellow-900/30 p-4">
                  <div className="mb-2 flex items-center justify-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-yellow-500">IMPORTANT</span>
                  </div>
                  <p className="text-sm text-white">
                    This QR code represents your unique user ID. Do not share it with anyone else. Sharing your QR code could
                    allow others to access your account and personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Start Button (visible only on small screens) */}
        <div className="mt-6 md:hidden">
          <Link href="/dashboard/game-mode/individual" className="block">
            <button className="w-full rounded-lg bg-yellow-500 py-3 text-lg font-bold text-black hover:bg-yellow-400">
              START GAME
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
