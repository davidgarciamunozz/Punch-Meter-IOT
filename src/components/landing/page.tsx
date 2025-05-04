import Image from "next/image"
import { Trophy } from "lucide-react"
import Link from "next/link"
export default function Landing() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/boxing-background.jpg"
          alt="Boxer background"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-6 md:px-8 lg:px-16">
        {/* Logo */}
        <div className="mt-4 w-full max-w-[180px] md:max-w-[220px]">
          <Link href="/">
            <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={220} height={80} className="w-full" />
          </Link>
        </div>

        {/* Instructions Card */}
        <div className="mx-auto w-full max-w-sm rounded-2xl bg-black/50 backdrop-blur-sm p-5 text-white md:max-w-md">
          <h2 className="mb-4 text-3xl font-bold">Instructions</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-white"></span>
              <span>Scan the QR code on the screen to begin.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-white"></span>
              <span>Individual mode: You&apos;ll have 3 punches to test your strength.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-white"></span>
              <span>Quick sign-up (just name, email and phone number for coupons).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-white"></span>
              <span>When it&apos;s your turn, hit the device hard (but carefully!, you will have 15 seconds).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-white"></span>
              <span>Check your results: punch strength & leaderboard rank.</span>
            </li>
          </ul>
          <div className="mt-4 flex items-center text-yellow-300">
            <Trophy className="mr-2 h-5 w-5" />
            <p className="italic">¡Los mejores golpes ganan premios de Everlast!</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-6 w-full max-w-sm rounded-xl bg-black/80 p-4 text-center text-white md:max-w-md">
          <h3 className="text-2xl font-bold italic">Are you ready?</h3>
          <p className="mb-1">Ready to show your power?</p>
          <p className="mb-4 flex items-center justify-center">
            Punch now! <span className="ml-1 text-xl">👊</span>
          </p>
          <Link
          href="/login"
          >
          <button className="mx-auto block rounded-full border-2 border-yellow-500 bg-transparent px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black">
            Start Now
          </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
