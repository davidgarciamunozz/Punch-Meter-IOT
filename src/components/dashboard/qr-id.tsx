import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function QrId() {
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

      {/* QR Code Content */}
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-4 py-6 text-center md:px-8">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center w-full max-w-[200px]">
          <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={160} height={40} />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-white">
          Unlock <span className="text-yellow-500">the Challenge,</span>
        </h1>
        <h2 className="mb-8 text-2xl font-bold text-white">present QR</h2>

        {/* QR Code */}
        <div className="mb-8 h-64 w-64 bg-black p-2">
          <Image src="/media/qr.png" alt="QR Code" width={240} height={240} />
        </div>

        {/* Instructions */}
        <p className="mb-8 text-lg italic text-white">Show your QR code to start the game</p>

        {/* Disclaimer */}
        <div className="rounded-lg border border-yellow-600 bg-yellow-900/30 p-4">
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
    </main>
  )
}
