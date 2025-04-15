import Image from "next/image"
import Link from "next/link"

export default function SignUp() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
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

      <div className="relative z-10 flex h-full flex-col items-center px-4 py-6 md:px-8 lg:px-16">
        {/* Logo */}
        <div className="mt-4 w-full max-w-[160px] md:max-w-[200px]">
        <Link href="/">
            <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={220} height={80} className="w-full" />
          </Link>
        </div>

        {/* Sign Up Form */}
        <div className="mt-8 w-full max-w-sm rounded-lg border border-gray-700 bg-black/40 p-5 backdrop-blur-sm md:max-w-md">
          <h2 className="mb-6 text-3xl font-bold italic text-white">Sign up</h2>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-white">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone number"
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </form>
        </div>

        {/* Sign Up Button */}
        <button className="mt-5 w-full max-w-sm rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-lg font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black md:max-w-md">
          Sign up
        </button>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-white">Do you have an account?</p>
          <Link
            href="/login"
            className="mt-2 inline-block rounded-full border-2 border-yellow-500 px-8 py-2 text-center text-white hover:bg-yellow-500 hover:text-black"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}
