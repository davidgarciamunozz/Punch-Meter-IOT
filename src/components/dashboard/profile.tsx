"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Profile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Datos ficticios para las estadísticas
  const dummyStats = {
    totalGames: 12,
    bestPunch: "500N",
    averageStrength: "450N",
    leaderboardPosition: "#5"
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirigir a login si el usuario no está autenticado
    if (mounted && !isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router, mounted]);

  if (!mounted || isLoading) {
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

      {/* Back Button */}
      <div className="relative z-10 p-4">
        <Link href="/dashboard" className="flex w-fit items-center text-white hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Link>
      </div>

      {/* Profile Content */}
      <div className="relative z-10 mx-auto max-w-md px-4 py-6 md:px-8">
        <div className="mb-6 rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <button className="rounded-full bg-yellow-500 p-2 text-black hover:bg-yellow-600">
              <Edit className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Username</label>
              <p className="text-lg font-bold text-yellow-500">{user.username}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">Stats</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Games</span>
              <span className="font-bold text-white">{dummyStats.totalGames}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Best Punch</span>
              <span className="font-bold text-yellow-500">{dummyStats.bestPunch}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Average Strength</span>
              <span className="font-bold text-white">{dummyStats.averageStrength}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Leaderboard Position</span>
              <span className="font-bold text-white">{dummyStats.leaderboardPosition}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
