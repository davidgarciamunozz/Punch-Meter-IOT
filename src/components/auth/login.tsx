import Image from "next/image"
import Link from "next/link"

export default function Login() {
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

        {/* Login Form */}
        <div className="mt-8 w-full max-w-sm rounded-lg border border-gray-700 bg-black/40 p-5 backdrop-blur-sm md:max-w-md">
          <h2 className="mb-6 text-3xl font-bold italic text-white">Login</h2>

          <form className="space-y-4">
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
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </form>
        </div>

        {/* Login Button */}
        <button className="mt-5 w-full max-w-sm rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-lg font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black md:max-w-md">
          Login
        </button>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-white">Don&apos;t have an account?</p>
          <Link
            href="/signup"
            className="mt-2 inline-block rounded-full border-2 border-yellow-500 px-8 py-2 text-center text-white hover:bg-yellow-500 hover:text-black"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  )
}
