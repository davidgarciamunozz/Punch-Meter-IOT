import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Medal, Trophy, Award } from "lucide-react"

export default function Leaderboard() {
  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, username: "ChampionBoxer", score: "650N", isCurrentUser: false },
    { rank: 2, username: "PowerPunch", score: "620N", isCurrentUser: false },
    { rank: 3, username: "KnockoutKing", score: "580N", isCurrentUser: false },
    { rank: 4, username: "StrongArm", score: "550N", isCurrentUser: false },
    { rank: 5, username: "USERNAME", score: "500N", isCurrentUser: true },
    { rank: 6, username: "FightMaster", score: "480N", isCurrentUser: false },
    { rank: 7, username: "PunchPro", score: "460N", isCurrentUser: false },
    { rank: 8, username: "BoxingBeast", score: "440N", isCurrentUser: false },
    { rank: 9, username: "GloveMaster", score: "420N", isCurrentUser: false },
    { rank: 10, username: "RingChamp", score: "400N", isCurrentUser: false },
  ]

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

      {/* Leaderboard Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6 md:px-8">
        <div className="mb-6 rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">Punch Strength Leaderboard</h1>

          {/* Top 3 Podium */}
          <div className="mb-8 flex items-end justify-center gap-4">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <Medal className="mb-2 h-8 w-8 text-gray-300" />
              <div className="h-20 w-16 rounded-t-lg bg-gray-700"></div>
              <div className="w-full rounded-b-lg bg-gray-800 p-2 text-center">
                <p className="text-xs text-gray-300">2nd</p>
                <p className="truncate text-sm font-bold text-white">PowerPunch</p>
                <p className="text-xs text-yellow-500">620N</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Trophy className="mb-2 h-10 w-10 text-yellow-500" />
              <div className="h-28 w-20 rounded-t-lg bg-yellow-600"></div>
              <div className="w-full rounded-b-lg bg-yellow-700 p-2 text-center">
                <p className="text-xs text-yellow-200">1st</p>
                <p className="truncate text-sm font-bold text-white">ChampionBoxer</p>
                <p className="text-xs text-yellow-300">650N</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <Award className="mb-2 h-8 w-8 text-amber-700" />
              <div className="h-16 w-16 rounded-t-lg bg-amber-800"></div>
              <div className="w-full rounded-b-lg bg-amber-900 p-2 text-center">
                <p className="text-xs text-amber-300">3rd</p>
                <p className="truncate text-sm font-bold text-white">KnockoutKing</p>
                <p className="text-xs text-amber-400">580N</p>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-hidden rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-white">Rank</th>
                  <th className="p-3 text-left text-sm font-semibold text-white">Username</th>
                  <th className="p-3 text-right text-sm font-semibold text-white">Best Punch</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`border-t border-gray-700 ${entry.isCurrentUser ? "bg-yellow-900/30" : "bg-black/60"}`}
                  >
                    <td className="p-3 text-sm text-white">{entry.rank}</td>
                    <td className={`p-3 text-sm ${entry.isCurrentUser ? "font-bold text-yellow-500" : "text-white"}`}>
                      {entry.username}
                    </td>
                    <td className="p-3 text-right text-sm font-bold text-yellow-500">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
