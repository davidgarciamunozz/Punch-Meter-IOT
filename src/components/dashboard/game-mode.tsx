// import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"

export default function GameMode() {
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

      {/* Game Mode Content */}
      <div className="relative z-10 mx-auto max-w-md px-4 py-6 md:px-8">
        <div className="mb-6 rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">Game Mode</h1>

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
        </div>

        <div className="rounded-lg border border-gray-700 bg-black/40 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">How to Play</h2>

          <ol className="list-decimal space-y-2 pl-5 text-white">
            <li>Follow the on-screen instructions to prepare</li>
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
    </main>
  )
}
