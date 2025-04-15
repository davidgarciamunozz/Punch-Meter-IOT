"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, User, Trophy, GamepadIcon, Home, LogOut, QrCode } from "lucide-react"

export default function DashboardHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
            <Link href="/" className="flex items-center py-3 text-red-500" onClick={() => setIsMenuOpen(false)}>
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}

      {/* User Dashboard Content */}
      <div className="relative z-10 px-4 py-6 md:px-8">
        {/* User Info */}
        <div className="mb-8">
          <p className="text-sm text-gray-300">Email</p>
          <p className="text-sm text-gray-300">Phone number</p>
          <h1 className="border-b border-gray-700 pb-2 text-3xl font-bold text-yellow-500">USERNAME</h1>
        </div>

        {/* Punch History */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl text-white">Punch history</h2>

          <div className="space-y-4">
            {/* Punch 1 */}
            <div className="flex space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex h-40 w-full items-center justify-center rounded-lg border border-gray-700 bg-black/40 sm:w-1/3 md:h-40 md:w-1/3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">1</div>
                  <div className="text-3xl font-bold text-yellow-500">500N</div>
                </div>
              </div>
              <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-100 p-4 sm:w-2/3 md:w-2/3">
                <div className="w-full">
                  <div className="relative mx-auto h-28 w-28">
                    <svg viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#d1d5db" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="0"
                        transform="rotate(-90, 60, 60)"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#7c3aed" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="67.86"
                        transform="rotate(-90, 60, 60)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">80%</div>
                      <div className="text-xs text-blue-600">First register</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Your punch</span>
                    <span className="ml-auto text-sm font-semibold text-blue-600">80%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Punch 2 */}
            <div className="flex space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex h-40 w-full items-center justify-center rounded-lg border border-gray-700 bg-black/40 sm:w-1/3 md:h-40 md:w-1/3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">2</div>
                  <div className="text-3xl font-bold text-yellow-500">500N</div>
                </div>
              </div>
              <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-100 p-4 sm:w-2/3 md:w-2/3">
                <div className="w-full">
                  <div className="relative mx-auto h-28 w-28">
                    <svg viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#d1d5db" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="0"
                        transform="rotate(-90, 60, 60)"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#7c3aed" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="67.86"
                        transform="rotate(-90, 60, 60)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">80%</div>
                      <div className="text-xs">no changes</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Your punch</span>
                    <span className="ml-auto text-sm font-semibold text-blue-600">80%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Punch 3 */}
            <div className="flex space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex h-40 w-full items-center justify-center rounded-lg border border-gray-700 bg-black/40 sm:w-1/3 md:h-40 md:w-1/3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">3</div>
                  <div className="text-3xl font-bold text-yellow-500">500N</div>
                </div>
              </div>
              <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-100 p-4 sm:w-2/3 md:w-2/3">
                <div className="w-full">
                  <div className="relative mx-auto h-28 w-28">
                    <svg viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#d1d5db" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="0"
                        transform="rotate(-90, 60, 60)"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#7c3aed" 
                        strokeWidth="12" 
                        strokeDasharray="339.3" 
                        strokeDashoffset="67.86"
                        transform="rotate(-90, 60, 60)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">80%</div>
                      <div className="text-xs">no changes</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Your punch</span>
                    <span className="ml-auto text-sm font-semibold text-blue-600">80%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Game Button */}
        <div className="flex justify-center">
          <Link
            href="/dashboard/game-mode"
            className="rounded-full border-2 border-yellow-500 bg-black px-8 py-3 text-xl font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black"
          >
            Start Game
          </Link>
        </div>
      </div>
    </main>
  )
}
